import React, { Component } from 'react';
import './Marker.css';
import InfoWindow from './InfoWindow';

class Marker extends Component {

    state = {
      infoWindowOpen: false
    }

    handleInfoWindow = (e) => {
      this.setState({
        infoWindowOpen: !this.state.infoWindowOpen,
      })
    }

    
    render() {
      const color = "blue";
      return (
        <React.Fragment>
        <div className="marker"
          style={{ backgroundColor: color, cursor: 'pointer'}}
          onClick={this.handleInfoWindow}
          // title={this.props.key}
        />

        {this.state.infoWindowOpen ? 
          <React.Fragment>
            <InfoWindow 
            name = {this.props.name}
            rating = {this.props.rating}
            placeId = {this.props.placeId}
            lat = {this.props.lat}
            lng = {this.props.lng}
          /> 
          </React.Fragment>
          : null }
        </React.Fragment>
      );
    }


  };

  export default Marker;