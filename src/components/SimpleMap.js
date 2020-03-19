import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker.js';
import MarkerUserLocation from './MarkerUserLocation.tsx';
import AddRestaurantForm from './AddRestaurantForm'


 
// const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {

  state = {
    clickMap: true,
    clickLat: 0,
    clickLng: 0
  }


  static defaultProps = {
    newCenter: {
      lat: 0,
      lng: 0
    },
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 12,
  };


  _onClick = (obj) => {
      console.log(obj.x, obj.y, obj.lat, obj.lng, obj.event);
      this.props.newCenter.lat = obj.lat;
      this.props.newCenter.lng = obj.lng;

      let lat = obj.lat;
      let lng = obj.lng;
      this.setState({
        clickLat: lat,
        clickLng: lng
      })
      console.log("clickLat: ", this.state.clickLat, "clickLng: ", this.state.clickLng)
      this.props.handleAddRestaurant() //toggles the AddRestaurantForm Component
      this.handleClickMap() //toggles the click event handler on the map
  }


  componentDidMount = () => {
    
    const updatePosition = () => {
      return new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      })
    }
    updatePosition()
      .then( (position) => {
        this.props.center.lat = position.coords.latitude;
        this.props.center.lng = position.coords.longitude;
        console.log("My Personal Location: ", this.props.center)
      })
      .catch( (err) => {
        console.error(err.message);
      })      
  }

  handleClickMap = () => {
    this.setState({
      clickMap: !this.state.clickMap
    })
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key:process.env.REACT_APP_GOOGLE_API_KEY }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onChildMouseEnter={this.onChildMouseEnter}
          onChildMouseLeave={this.onChildMouseLeave}
          onClick={ this.state.clickMap? this._onClick : null}
        >
          <MarkerUserLocation
              lat={this.props.center.lat}
              lng={this.props.center.lng}
              name="My Marker"
              color="red"
            />
          {this.props.restaurants.map( restaurant => 
            <Marker
              key={restaurant.id}
              lat={restaurant.geometry.location.lat}
              lng={restaurant.geometry.location.lng}
              name = {restaurant.name}
              rating = {restaurant.rating}
              placeId = {restaurant.place_id}
            />
          )}
          {this.props.addRestaurant ? 
          <React.Fragment>
            <AddRestaurantForm 
              addNewRestaurant={this.props.addNewRestaurant}
              handleAddRestaurant={this.props.handleAddRestaurant}
              handleClickMap={this.handleClickMap}
              clickLat={this.state.clickLat}
              clickLng={this.state.clickLng}
            />
          </React.Fragment>
          : null }
          
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
