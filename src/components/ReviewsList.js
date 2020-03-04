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
        console.log(placeId)

        const getReviews = () => {
            return new Promise(function(resolve, reject) {
            let url2 = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,review&key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
            const proxyurl = "https://cors-anywhere.herokuapp.com/";
            let url = proxyurl + url2;
            axios.get(url)
                .then(response => {
                console.log(response.data.result.reviews);
                return response.data.result.reviews;
                // this.setState({
                //     reviews: response.data.result
                // });
                })
                .catch( error => {
                // handle error
                console.log(error);
                })
            })
        }
        
        getReviews()
        .then((reviews) => {
            this.setState({
                reviews: reviews
            })
        })
      }


    render() { 
        console.log(this.state)
        return ( 
            <div>
                <div>
                    <p>Hello here I am!</p>
                    {this.state.reviews.map( restaurant => 
                        <Review 
                            placeId = {this.props.placeId}
                            author = {restaurant.author_name}
                            author_url = {restaurant.author_url}
                            profile_photo_url = {restaurant.profile_photo_url}
                            rating = {restaurant.rating}
                            text = {restaurant.text}
                            timePosted = {restaurant.relative_time_description}

                        />
                    )}
                    <button className="btn btn-info btn-sm submitButton" type="submit">Add a Review</button>
                </div>
            </div>
         );
    }
}
 
export default ReviewsList;