import React, { Component, useReducer } from 'react'
import Review from './Review'
import axios from 'axios'


class ReviewsList extends Component {
    state = {
        reviews: [],
        value: {
            name: "",
            text: ""
        },
    };

      
    handleChangeName = (event) => {
        this.setState({
            value: {
                name: event.target.value,
            }
        });
        // console.log(this.state.value.name)
    }

    handleChangeText = (event) => {
        this.setState({
            value: {
                text: event.target.value
            }
        });
        // console.log(this.state.value.text)
    }

    handleSubmit = (event) => {
        let newReview = {
            author: this.state.value.name,
            text: this.state.value.text,
            author_url: './images/useReducer.png'

        }
        // let arr = ...this.state.reviews
        this.setState({
            reviews: this.state.reviews.concat(newReview)
        })
        console.log('A review was submitted: ' + this.state.value.name + this.state.value.text);
        event.preventDefault();
      }


    componentDidMount = () => {

        const placeId = this.props.placeId

        const getReviews = () => {
            return new Promise( (resolve, reject) => {
            let url2 = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,review&key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
            const proxyurl = "https://cors-anywhere.herokuapp.com/";
            let url = proxyurl + url2;
            axios.get(url)
                .then((response) => {
                console.log(response.data.result.reviews);
                // return response.data.result.reviews;
                this.setState({
                    reviews: response.data.result.reviews
                });
                })
                .catch( error => {
                // handle error
                console.log(error);
                })
            })
        }
        getReviews()
      } //End of componentDidMount

    render() { 
        return ( 
            <div>
                {this.state.reviews.map( restaurant => 
                    <Review 
                        key = {this.props.restaurantId + restaurant.author_name }
                        placeId = {this.props.placeId}
                        author = {restaurant.author_name}
                        author_url = {restaurant.author_url}
                        profile_photo_url = {restaurant.profile_photo_url}
                        rating = {restaurant.rating}
                        text = {restaurant.text}
                        timePosted = {restaurant.relative_time_description}

                    />
                )}
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <h5>Add a Review:</h5>
                        <input className="form-control addReviewName" id="addReviewAuthorName" type="text" placeholder="Your name:" value={this.state.value.name} onChange={this.handleChangeName} />
                        <textarea className="form-control addReviewText" id="addReviewTextArea" rows="3" placeholder="Type your review here." value={this.state.value.text} onChange={this.handleChangeText}></textarea>
                    </div>
                    <button className="btn btn-info btn-sm submitButton" type="submit" value="Submit">Add Review</button>  
                </form>
 
            </div>
         );
    }
}
 
export default ReviewsList;