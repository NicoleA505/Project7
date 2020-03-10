import React from 'react'
import Restaurant from './Restaurant'



const RestaurantList = (props) => { 

    return (
       
        props.restaurants.map( restaurant => 
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
            )
    );
}

export default RestaurantList;