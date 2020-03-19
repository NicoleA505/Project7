import React, { Component } from 'react'
import ReviewsList from './ReviewsList'
// import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.min.css';



class Restaurant extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isToggle: false
        };
      }

    handleClick = (e) => {
        this.setState({
            isToggle: !this.state.isToggle,
        })
      }

    // checkStreetView = () => {
    // axios
    //   .get(
    //     // `https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${this.props.location.lat},${this.props.location.lng}&heading=151.78&pitch=-0.76&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
    //     `https://maps.googleapis.com/maps/api/streetview/metadata?size=600x300&location=${this.props.location.lat},${this.props.location.lng}e&heading=-45&pitch=42&fov=110&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
    //   )
    //   .then(
    //         (response) => {
    //             if(response.data.status == "OK") {
    //                 return `https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${this.props.location.lat},${this.props.location.lng}&heading=151.78&pitch=-0.76&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
    //             } else if (response.data.status == "NOT_FOUND") {
    //                 return ``
    //             }
    //         }
    //   )
    //   .catch(
    //         (error) => {
    //                 console.log(error)
    //         }
    //   )
    // }


    render(){
        const char = "✸"
        // console.log(this.props.openingHours.open_now)

        let photo_url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&photoreference=${this.props.photo.photo_reference}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`

        // const streetview_url = this.checkStreetView();
        let streetview_url = `https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${this.props.location.lat},${this.props.location.lng}&heading=151.78&pitch=-0.76&key=${process.env.REACT_APP_GOOGLE_API_KEY}`

        return (
            <div id="card" className="card">
                <h4 className="restaurant-name arial-font">{this.props.name}</h4>
                <p className="restaurant-address">{this.props.address}</p>
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
                {/* </div> */}

 
                
            </div>
        );
    }
}

export default Restaurant;
