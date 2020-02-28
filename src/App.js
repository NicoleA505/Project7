import React from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import SimpleMap from  './components/SimpleMap'
import RestaurantList from './components/RestaurantList'
import './App.css';
import iconImage from './images/fork.png'

export default class App extends React.Component {

  state = {
    coordinates: {
      lat: 0,
      long: 0,
    },
    restaurants: [],
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

    render(){
      return (
        <div>
          <div className="main-header">
            <img className="icon-image" src= {iconImage} alt="Logo"/>
            <h1 className="main-header-text">Restaurants Locater</h1>
          </div>
          <div className="App">
            <div className="map">
              <SimpleMap
                restaurants={this.state.restaurants}
                coordinates={this.state.coordinates}
                // zoom={this.state.zoom}
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