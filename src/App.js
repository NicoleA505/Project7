import React, { Component } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import SimpleMap from  './components/SimpleMap'
import RestaurantList from './components/RestaurantList'
import Star from './components/Star'
import './App.css';
import iconImage from './images/fork.png'

export default class App extends Component {

  state = {
    coordinates: {
      lat: 0,
      long: 0,
    },
    restaurants: [], 
    filteredRestaurants: [],
    isFiltered: false,
    addRestaurant: false,
    rating: 5,
    placeIdClick: "",
    placeIdofRestaurantToCompare: "",
    matchIsFound: false
  }

  getRestaurants = () => {
    let url2 = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${process.env.REACT_APP_GOOGLE_API_KEY}&type=restaurant&location=${this.state.coordinates.lat},${this.state.coordinates.long}&radius=10000&origin=*`
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    let url = proxyurl + url2;
    axios.get(url)
    .then(response => {
        // console.log(response.data.results[0]);
    // handle success
    this.setState({
        restaurants: response.data.results
    });
    })
    .catch(function (error) {
    // handle error
    console.log(error);
    })
  }

  getPosition = () => {
    return new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    })
  }

  renderStars = () => {
    let stars = [];
    let maxRating = 5;
    for(let i = 0; i < maxRating; i++ ){
        stars.push(
            <Star 
                key={i}
                setRating={ () => this.handleSetRating(maxRating - i)}
                isSelected={this.state.rating > i}
            />
        );
    }
    return stars;
  }

  handleSetRating = (rating) => {
    console.log("Rating passed to handleSetRating as argument: ", rating)
      this.setState(
        (state) => ({
          rating,
          isFiltered: true
        })
      )
    }
  

  handleAddRestaurant = () => {
    this.setState({
      addRestaurant: !this.state.addRestaurant
    })
  }

  addNewRestaurant = (newRestaurant) => {
    console.log(newRestaurant)
    this.setState({
          restaurants: [
              ...this.state.restaurants,
              newRestaurant
          ],
          handleAddRestaurant: false
  })
    console.log(this.state.restaurants)
  }

  minusRating = () => {
    if (this.state.rating === 5) {
      // console.log("it's a 5 and returning 0.9")
      return 0.9
    } else {
      // console.log("it's NOT a 5 and returning 0")
      return 0
    }
  }

  bringPlaceIdUp = (placeId) => { //Brings the placeId of the restaurant in the RestaurantList up to this component
    if(placeId) {
      this.setState({
        placeIdofRestaurantToCompare: placeId
      })
      return true;
    }
  }

  handleScrollHighlight = (placeId) => { //Brings the placeId of the marker clicked up to the App.js 
    // console.log(placeId);
    this.setState({
      placeIdClick: placeId,
    })
    // if (this.state.placeIdClick === this.state.placeIdofRestaurantToCompare && this.state.isInfoWindowOpen) {
    if (this.state.placeIdClick === this.state.placeIdofRestaurantToCompare) {
      console.log("This is actually working at they match!")
      this.setState({
        matchIsFound: true
      })
    }
  }

  handleScrollHighlightRemove = () => {
    this.setState({
      matchIsFound: false
    })
  }


  componentDidMount = () => {
    
  this.getPosition()
    .then( (position) => {
      this.setState({
        coordinates: {
          ...this.state.coordinates,
          lat: position.coords.latitude,
          long: position.coords.longitude
        } 
      })
      this.getRestaurants();
    })
    .catch( (err) => {
      console.error(err.message);
    })
  }       //End of ComponentDidMount

 
    render() {

      let filteredItems = this.state.restaurants.filter( restaurant =>
            restaurant.rating >= (this.state.rating - this.minusRating())
        )
      console.log("filteredItems: ", filteredItems);

      let selectedRestaurants = this.state.isFiltered? filteredItems : this.state.restaurants;
      console.log("selectedRestaurants: ", selectedRestaurants);

      return (
        
        <div>
          <nav className="navbar navbar-light bg-light">
            <a className="navbar-brand main-header-text display-flex m-0" href="#nav">
              <img src={iconImage} className="d-inline-block align-top icon-image" alt="" />
              <span>Spoon Search</span>
            </a>
          </nav>

          <div className="App">
            <div className="map">
              <SimpleMap
                restaurants={selectedRestaurants}
                coordinates={this.state.coordinates}
                addNewRestaurant={this.addNewRestaurant} //function that actually adds the restaurant to the restaurant array
                addRestaurant={this.state.addRestaurant} //the toggle state for restaurant form
                handleAddRestaurant={this.handleAddRestaurant} //toggles the restaurant form
                handleScrollHighlight={this.handleScrollHighlight}
                bringInfoWindowOpenUp={this.bringInfoWindowOpenUp}
                handleScrollHighlightRemove={this.handleScrollHighlightRemove}
              />
            </div>
            <div className="restaurant-list">
              <RestaurantList   
                restaurants={selectedRestaurants}
                renderStars={this.renderStars}
                handleSetRating={this.handleSetRating}
                placeIdClick={this.state.placeIdClick}
                bringPlaceIdUp={this.bringPlaceIdUp}
                matchIsFound={this.state.matchIsFound}
                />
            </div>
          </div>
        </div>

      );
    }
}