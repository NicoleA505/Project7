import React, { Component } from 'react'
import Review from './Review'
import axios from 'axios'
import AddReviewForm from './AddReviewForm';


class ReviewsList extends Component {
    state = {
        reviews: []
    };


    handleAddNewReview = (newReview) => {
        this.setState( prevState => {
            return {
                reviews: [
                    ...prevState.reviews,
                    newReview
                ]
            }
        })
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
                <AddReviewForm 
                    addNewReview = {this.handleAddNewReview}
                />
 
            </div>
         );
    }
}
 
export default ReviewsList;