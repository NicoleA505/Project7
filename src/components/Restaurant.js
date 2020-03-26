import React, { Component } from 'react'
import ReviewsList from './ReviewsList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';



class Restaurant extends Component {
    
    constructor(props) {
        super(props);
        this.restaurantScroll = React.createRef();
        this.state = {
            isToggle: false,
            streetviewImage: `https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${this.props.location.lat},${this.props.location.lng}&heading=151.78&pitch=-0.76&key=${process.env.REACT_APP_GOOGLE_API_KEY}`,
        };
        this.handleClick = this.handleClick.bind(this);
        this.checkStreetView = this.checkStreetView.bind(this);
        this.checkAgain = this.checkAgain.bind(this);
      }
    
      

    handleClick = (e) => {
        this.setState({
            isToggle: !this.state.isToggle,
        })
      }

    checkStreetView = () => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/streetview/metadata?size=600x300&location=${this.props.location.lat},${this.props.location.lng}&fov=90&heading=235&pitch=10&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
      )
      .then(
            (response) => {
                if(response.data.status === "OK") {
                    // console.log("An image was available and should be displayed!");
                } else if (response.data.status === "ZERO_RESULTS") {
                    // console.log(response.data)
                    // console.log(response.data.status)
                    this.setState({
                        streetviewImage: require('../images/restaurant2.png')
                    })
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

    checkAgain = () => {
        if (this.props.matchIsFound && this.props.placeIdClick === this.props.placeId) {
            return true;
        }
    }


    componentDidMount = () => {
        this.checkStreetView();
    }

    scrollTime = () => {
        if (this.props.matchIsFound && this.props.placeIdClick === this.props.placeId) {
            this.restaurantScroll.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
            return true;
        }
    }

    onChange = () => {
        this.props.bringPlaceIdUp();
        this.scrollTime();
    }

    render(){
        const char = "✸"

        console.log(this.props.matchIsFound)

        let photo_url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&photoreference=${this.props.photo.photo_reference}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
        
        return (
            <div ref={this.restaurantScroll} onChange={this.onChange()} className={this.checkAgain() ? 'card card-selected' : 'card'} >
            {/* <div className='card'> */}
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
                    <img className="streetviewImage" src={this.state.streetviewImage} alt={this.props.name}/>
                </div>
                       
                <div className="ratingStarDiv">
                    <p className="arial-font ratings-header text-left">Average Customer Ratings:</p>
                    <div className="ratingsAverageInfo">
                        <div>
                            <p className="star-symbol">{char.repeat(this.props.ratingStars)}</p>
                            <p className="ratingNumber">{this.props.ratingStars}</p>
                        </div>
                        <span className="userRatingsTotal">Out of {this.props.userRatingsTotal} reviews</span>
                    </div>
                   

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
