import React, { Component } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import SimpleMap from  './components/SimpleMap'
import RestaurantList from './components/RestaurantList'
import './App.css';
import iconImage from './images/fork.png'

export default class App extends Component {

  state = {
    coordinates: {
      lat: 0,
      long: 0,
    },
    restaurants: [],
    addRestaurant: false,
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
      console.log(this.state.restaurants)
      return (
        <div>
          <nav className="navbar navbar-light bg-light">
            <a className="navbar-brand main-header-text" href="#nav">
              <img src={iconImage} className="d-inline-block align-top icon-image" alt="" />
              Restaurant Finder
            </a>
          </nav>

          
          {/* <div className="main-header">
            <img className="icon-image" src= {iconImage} alt="Logo"/>
            <h1 className="main-header-text">Restaurants Locater</h1>
          </div> */}
          <div className="App">
            <div className="map">
              <SimpleMap
                restaurants={this.state.restaurants}
                coordinates={this.state.coordinates}
                addNewRestaurant={this.addNewRestaurant}
                addRestaurant={this.state.addRestaurant}
                handleAddRestaurant={this.handleAddRestaurant}
              />
            </div>
            <div className="restaurant-list">
              <RestaurantList   
                restaurants={this.state.restaurants}
                />
            </div>
          </div>
        </div>

      );
    }
}