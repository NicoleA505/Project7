import React, { Component } from 'react'
import ReviewsList from './ReviewsList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';



class Restaurant extends Component {
    
    state = {
        isToggle: false
    };
      

    handleClick = (e) => {
        this.setState({
            isToggle: !this.state.isToggle,
        })
      }

    // checkWhichMarkerClicked = () => {
    //     let placeIdClick = this.props.placeIdClick;
    //     let placeId = this.props.placeId;
    //     if(placeIdClick === placeId) {
    //         console.log("They match! Name of restaurant is: ", this.props.name);
    //         // placeId.scrollIntoView(true);
    //     }
    // }

    checkStreetView = () => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/streetview/metadata?size=600x300&location=${this.props.location.lat},${this.props.location.lng}&fov=90&heading=235&pitch=10&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
      )
      .then(
            (response) => {
                if(response.data.status === "OK") {
                    // console.log("This is returning fine!");
                    return `https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${this.props.location.lat},${this.props.location.lng}&heading=151.78&pitch=-0.76&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
                } else if (response.data.status === "ZERO_RESULTS") {
                    // console.log(response.data)
                    // console.log(response.data.status)
                    return require('../images/restaurant.jpg')
                }
            }
      )
      .catch(
            (error) => {
                console.log(error);
                console.log(error.response.data.error)
            }
      )
    }


    render(){
        const char = "✸"

        let streetview_url = this.checkStreetView();

        let photo_url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&photoreference=${this.props.photo.photo_reference}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`

        // console.log(this.checkStreetView());

        // this.checkWhichMarkerClicked();

        return (
            // <div className={this.checkWhichMarkerClicked ? 'card card-selected' : 'card'} >
            <div className='card'>
                <h4 className="restaurant-name arial-font">{this.props.name}</h4>
                <div className="display-flex">
                    <FontAwesomeIcon icon={faMapMarkerAlt} size="xs" />
                    <p className="restaurant-address">{this.props.address}</p>
                </div>
                <p className={this.props.openingHours ? 'restaurant-open-color' : 'restaurant-closed-color'}>
                {this.props.openingHours ? 'Open Now!' : 'Closed'}
                </p>
                <div>
                    <img className="placesImage" src={photo_url} alt={this.props.name}/>
                    <img className="streetviewImage" src={streetview_url} alt={this.props.name}/>
                </div>
                       
                <div className="ratingStarDiv">
                    <p className="arial-font ratings-header">Customer Ratings:</p>
                    <p className="star-symbol">{char.repeat(this.props.ratingStars)}</p>
                    <p className="ratingNumber">{this.props.ratingStars}</p>
                </div>
                <button className="btn btn-primary seeReviewsButton" onClick={this.handleClick} type="button">
                    {this.state.isToggle? "Hide Reviews" : "See Reviews"}
                </button>
                { this.state.isToggle ? 
                    <ReviewsList 
                    placeId = {this.props.placeId}
                    restaurantId = {this.props.restaurantId}
                    />
                    : null }
            </div>
        );
    }
}

export default Restaurant;
