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
    rating: 0
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

  componentDidMount = () => {

    const getPosition = () => {
      return new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      })
    }
    
  getPosition()
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
  } //End of ComponentDidMount

  renderStars = () => {
    let stars = [];
    let maxRating = 5;
    for(let i = 0; i < maxRating; i++ ){
        stars.push(
            <Star 
                key={i}
                setRating={ () => this.handleSetRating(i + 1)}
                isSelected={this.state.rating > i}
            />
        );
    }
    return stars;
  }

  filterRestaurants = () => {
    // this.getRestaurants(); //Calling for the original restaurants array again so when filtering a second time it doesn't filter through the first filtered array.
    const result = this.state.restaurants.filter(restaurant =>
        restaurant.rating >= this.state.rating
        );
    console.log("Result of the filter: ", result);
    this.setState({
      isFiltered: true,
      filteredRestaurants: result
    })
    console.log("this.state.restaurants after the filter (filtered results pushed into the state): ", this.state.restaurants)
  }

  handleSetRating = (rating) => {
      if(this.state.rating === rating) {
          this.setState({
              rating: 0,
              isFiltered: false
          });
          this.getRestaurants(); //Calling the original google API array if clicking the ratings star amount again, cancelling the filter request
      } else {
          this.setState({
              rating,
              isFiltered: true
          });
          this.filterRestaurants();
      }
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

    render(){
      console.log("This.state.restaurants: ", this.state.restaurants)
      // console.log(this.state.coordinates)
      return (
        <div>
          <nav className="navbar navbar-light bg-light">
            <a className="navbar-brand main-header-text display-flex" href="#nav">
              <img src={iconImage} className="d-inline-block align-top icon-image" alt="" />
              <span>Spoon Search</span>
            </a>
          </nav>

          <div className="App">
            <div className="map">
              <SimpleMap
                restaurants={this.state.restaurants}
                coordinates={this.state.coordinates}
                addNewRestaurant={this.addNewRestaurant} //function that actually adds the restaurant to the restaurant array
                addRestaurant={this.state.addRestaurant} //the toggle state for restaurant form
                handleAddRestaurant={this.handleAddRestaurant} //toggles the restaurant form
              />
            </div>
            <div className="restaurant-list">
              <RestaurantList   
                restaurants={this.state.restaurants}
                renderStars={this.renderStars}
                handleSetRating={this.handleSetRating}
                // filterRestaurants={this.filterRestaurants}
                />
            </div>
          </div>
        </div>

      );
    }
}