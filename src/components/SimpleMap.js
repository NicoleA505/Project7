import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker.js';
import MarkerUserLocation from './MarkerUserLocation.tsx';
import AddRestaurantForm from './AddRestaurantForm'


 
// const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {

  state = {
    center: {
      lat: 0,
      long: 0
    }
    // clickMap: true,
    // clickLat: 0,
    // clickLng: 0
  }


  static defaultProps = {
    center: {
      lat: 34.4208,
      lng: 119
    },
    zoom: 12,
  };


  _onClick = (obj) => {
      // console.log(obj.x, obj.y, obj.lat, obj.lng, obj.event);
      let lat = obj.lat;
      let lng = obj.lng;
      this.setState({
        clickLat: lat,
        clickLng: lng
      })
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
        this.setState({
          center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        })
        this.props.center.lat = position.coords.latitude;
        this.props.center.lng = position.coords.longitude;
        // console.log("My Personal Location: ", this.props.center)
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

    // console.log(this.state.center)
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key:process.env.REACT_APP_GOOGLE_API_KEY }}
          defaultCenter={this.props.center}
          center={this.state.center}
          defaultZoom={this.props.zoom}
          onChildMouseEnter={this.onChildMouseEnter}
          onChildMouseLeave={this.onChildMouseLeave}
          onClick={ this.state.clickMap? this._onClick : null}
          // yesIWantToUseGoogleMapApiInternals
          // onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
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
              photo = {restaurant.photos[0]}
              handleScrollHighlight={this.props.handleScrollHighlight}
              bringInfoWindowOpenUp={this.props.bringInfoWindowOpenUp}
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
