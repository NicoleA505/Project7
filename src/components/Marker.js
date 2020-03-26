import React, { Component } from 'react';
import './Marker.css';
import InfoWindow from './InfoWindow';

class Marker extends Component {

    state = {
      infoWindowOpen: false
    }
    
    // checkingIsInfowindowOpen = () => {
    //   if (this.state.infoWindowOpen) {
    //     this.props.bringInfoWindowOpenUp()
    //   }
    // }

    handleInfoWindow = (e) => {

      if(this.state.infoWindowOpen === false) {
        this.setState({
          infoWindowOpen: !this.state.infoWindowOpen
        })
        const placeId = this.props.placeId
        this.props.handleScrollHighlight(placeId);
      } else {
        this.setState({
          infoWindowOpen: !this.state.infoWindowOpen
        })
      }  
    }

    // handleInfoWindow = (e) => {

    //   if(this.state.infoWindowOpen === false) {
    //     this.setState({
    //       infoWindowOpen: !this.state.infoWindowOpen
    //     })
    //     const placeId = this.props.placeId
    //     this.props.handleScrollHighlight(placeId);
    //   } else if (this.state.infoWindowOpen === true) {
    //     this.setState({
    //       infoWindowOpen: !this.state.infoWindowOpen
    //     })
    //     this.props.handleScrollHighlightRemove();
    //   } 
    // }

    // onClick = (e) => {
    //   this.checkingIsInfowindowOpen();
    //   this.handleInfoWindow(e)
    // }

    
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
            photo = {this.props.photo}
          /> 
          </React.Fragment>
          : null }
        </React.Fragment>
      );
    }


  };

  export default Marker;