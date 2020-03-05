import React, { Component } from 'react'
import ReviewsList from './ReviewsList'
import 'bootstrap/dist/css/bootstrap.min.css';



class Restaurant extends Component { 
    // let photo_url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${props.photo[0].photo_reference}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`

    constructor(props) {
        super(props);
        this.state = {
            isToggle: false
        };
      }

    handleClick = (e) => {
            this.setState({
                isToggle: !this.state.isToggle
            })
      }

    render(){
        const char = "✸"
        return (
            <div id="card" className="card">
                <h2 className="restaurant-name arial-font">{this.props.name}</h2>
                <p className="restaurant-address">{this.props.address}</p>
                {/* <img src={photo_url} alt={this.props.name}/> */}
                <h4 className="arial-font ratings-header">Customer Ratings:</h4>
                <div className="ratingStarDiv">
                    <p className="star-symbol">{char.repeat(this.props.ratingStars)}</p>
                    <p className="ratingNumber">{this.props.ratingStars}</p>
                </div>
                <button className="btn btn-primary" onClick={this.handleClick}>See Reviews</button>
                {/* <div style={{display: this.state.isToggle? 'block' : 'none'}}>  */}
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
