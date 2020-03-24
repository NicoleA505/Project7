import React, { Component } from 'react';
import Restaurant from './Restaurant'
import StarRating from './StarRating'



class RestaurantList extends Component { 
    
    // state = {
    //     placeIdofRestaurantToCompare: ""
    // }

    // bringPlaceIdUp = (placeId) => { //Brings the placeId of the restaurant up to this component
    //     this.setState({
    //         placeIdofRestaurantToCompare: placeId
    //     })
    //     console.log(this.state.placeIdofRestaurantToCompare)
    // }

    // checkWhichMarkerClicked = () => { //Compares the placeId to that of the palceId of the marker clicked on
    //         let placeIdClick = this.props.placeIdClick;
    //         let placeId = this.state.placeIdofRestaurantToCompare;
    //         if(placeIdClick === placeId) {
    //             console.log("They match! Name of restaurant is: ", this.props.name);
    
    //             // placeId.scrollIntoView(true);
    //         }
    //     }

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
                    // placeIdClick = {this.props.placeIdClick}
                    // bringPlaceIdUp = {this.bringPlaceIdUp}
                />
            )}
        </div>
        )
    }
}

export default RestaurantList;