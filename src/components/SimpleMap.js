import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker.tsx';
import MarkerUserLocation from './MarkerUserLocation.tsx';
 
// const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {

  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 12
  };

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
      })
      .catch( (err) => {
        console.error(err.message);
      })      
  }

  render() {
    // console.log(this.props.coordinates);
    // console.log(this.props.center)
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key:process.env.REACT_APP_GOOGLE_API_KEY }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onChildMouseEnter={this.onChildMouseEnter}
          onChildMouseLeave={this.onChildMouseLeave}
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
              name="My Marker"
              color="blue"
            />
          )}
          
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
