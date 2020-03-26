import React, { Component } from 'react';
import Restaurant from './Restaurant'
import StarRating from './StarRating'



class RestaurantList extends Component { 
  

    render() {
        return (
        <div>
            <div>
                <p className="lead filterText">Show resaurants with a rating of:</p>

            </div>
            <StarRating 
                        renderStars={this.props.renderStars}
                        handleSetRating={this.props.handleSetRating}
            />          
            {this.props.restaurants.map( restaurant => 
                <Restaurant 
                    innerRef={this.ref}
                    key = {restaurant.id.toString()}
                    name = {restaurant.name}
                    address = {restaurant.vicinity}
                    ratingStars = {restaurant.rating}
                    restaurantId = {restaurant.id}
                    photo = {restaurant.photos[0]}
                    placeId = {restaurant.place_id}
                    location = {restaurant.geometry.location}
                    openingHours = {restaurant.opening_hours}
                    userRatingsTotal = {restaurant.user_ratings_total}
                    placeIdClick = {this.props.placeIdClick}
                    bringPlaceIdUp = {this.props.bringPlaceIdUp}
                    matchIsFound={this.props.matchIsFound}
                />
            )}
        </div>
        )
    }
}

export default RestaurantList;