import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker.tsx';
 
// const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  render() {
    // console.log(this.props.center);
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
          <Marker
            lat={this.props.center.lat}
            lng={this.props.center.long}
            name="My Marker"
            color="blue"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;




// const SimpleMap = (props) => {
//     // console.log("Coordinates: ", this.props.center)
//     // const { center, restaurants, zoom } = props;
//     // console.log("Center: ", center);
//     return (
//       // Important! Always set the container height explicitly
//       <div style={{ height: '100vh', width: '100%' }}>
//         <GoogleMapReact
//           bootstrapURLKeys={{ key:process.env.REACT_APP_GOOGLE_API_KEY}}
//           center={center}
//           defaultZoom={zoom}
//           // yesIWantToUseGoogleMapApiInternals
//           // onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
//           // onChildMouseEnter={onChildMouseEnter}
//           // onChildMouseLeave={onChildMouseLeave}
//         >
//           <Marker
//             lat={center.lat}
//             lng={center.long}
//             name="My Marker"
//             color="blue"
//           />
//         </GoogleMapReact>
//       </div>
//     );
// }
 
// export default SimpleMap;