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
                photo = {restaurant.photos}
                placeId = {restaurant.place_id}
            />
            )
    );
}

export default RestaurantList;