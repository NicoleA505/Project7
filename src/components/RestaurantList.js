import React, { Component } from 'react'
import Restaurant from './Restaurant'
import StarRating from './StarRating'



class RestaurantList extends Component { 

    // state = {
    //     rating: 0
    // }

    // renderStars = () => {
    //     let stars = [];
    //     let maxRating = 5;
    //     for(let i = 0; i < maxRating; i++ ){
    //         stars.push(
    //             <Star 
    //                 key={i}
    //                 setRating={ () => this.handleSetRating(i + 1)}
    //                 isSelected={this.state.rating > i}
    //             />
    //         );
    //     }
    //     return stars;
    // }

    // handleSetRating = (rating) => {
    //     if(this.state.rating === rating) {
    //         this.setState({
    //             rating: 0
    //         });
    //     } else {
    //         this.setState({
    //             rating
    //         });
    //     }
    // } 


    render() {
        return (
        <div>
            <div>
                <p className="lead text-center mt-3">Show resaurants with a rating of:</p>

            </div>
            <StarRating 
                        renderStars={this.props.renderStars}
                        handleSetRating={this.props.handleSetRating}
            />
            {this.props.restaurants.map( restaurant => 
                <Restaurant 
                    key = {restaurant.id.toString()}
                    name = {restaurant.name}
                    address = {restaurant.vicinity}
                    ratingStars = {restaurant.rating}
                    restaurantId = {restaurant.id}
                    photo = {restaurant.photos[0]}
                    placeId = {restaurant.place_id}
                    location = {restaurant.geometry.location}
                    openingHours = {restaurant.opening_hours}
                />
                )}
            </div>
        )
    }
}

export default RestaurantList;