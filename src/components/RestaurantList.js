import React from 'react'
import Restaurant from './Restaurant'
import StarRating from './StarRating'



const RestaurantList = (props) => { 

    return (
    <div>
        <div>
            <p className="lead text-center mt-3">Show resaurants with a rating of:</p>

        </div>
        <StarRating 
                    renderStars={props.renderStars}
                    handleSetRating={props.handleSetRating}
        />
        {props.restaurants.map( restaurant => 
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

export default RestaurantList;