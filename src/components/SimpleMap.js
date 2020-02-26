import React from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker.tsx';
 
const SimpleMap = (props) => {
    // console.log("Coordinates: ", this.props.center)
    const { center, restaurants, zoom } = props;
    console.log("Center: ", center);
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key:process.env.REACT_APP_GOOGLE_API_KEY}}
          center={center}
          defaultZoom={zoom}
          // yesIWantToUseGoogleMapApiInternals
          // onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
          // onChildMouseEnter={onChildMouseEnter}
          // onChildMouseLeave={onChildMouseLeave}
        >
          <Marker
            lat={center.lat}
            lng={center.long}
            name="My Marker"
            color="blue"
          />
        </GoogleMapReact>
      </div>
    );
}
 
export default SimpleMap;