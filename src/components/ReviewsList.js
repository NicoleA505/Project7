import React, { Component } from 'react'
import Review from './Review'
import axios from 'axios'


class ReviewsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: []
        };
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
        
        //the problem is here since it isn't even showing the console.log. BUT the ReviewsList component IS being rendered, which means that the reviews state is not being updated correctly!
        getReviews()
            // .then( (reviews) => {
            //     console.log("Hello getReviews is firing!")
            //     this.setState({
            //         reviews: reviews
            //     })
            // })

        
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
                <form>
                    <div class="form-group">
                        <textarea class="form-control" id="addReviewTextArea" rows="3" placeholder="Type your review here."></textarea>
                    </div>
                </form>
                <button className="btn btn-info btn-sm submitButton" type="submit">Add a Review</button>   
            </div>
         );
    }
}
 
export default ReviewsList;