import React, { Component } from 'react';

class AddRestaurantForm extends Component {
    state = { 
        restaurantName: "",
     }

          
    handleChange = (event) => {
        this.setState({
            restaurantName: event.target.value,
            // lat:
            // lng:
        });
        // console.log(this.state.restaurantName)
    }

    handleSubmit = (event) => {
        event.preventDefault();

        let newRestaurant = {
            geometry: {
                location: {
                    lat: this.props.clickLat,
                    lng: this.props.clickLng
                }
            },
            id: (this.props.clickLat + this.state.restaurantName),
            name: this.state.restaurantName,
            opening_hours: {
                open_now: true
            },
            photos: [{
                height: 3024,
                photo_reference: "CmRaAAAAS7R8p1coDxB3VL7Xmyx37x_WZXWU1crn3KriDQB-ptJRD_j4956d8zs2HR880Ja8vBdrGy8eoukces4KTX-aX7DxNU425cT2Ucdvz3loNGIXjpoj7hh4Oq7jw7DcTcAeEhDRDkRuB6Xays1mWWH0YVB8GhQ4uxlUO8Lc5FBtB4UqdU1UTs_C5Q",
                width: 4032
            }],
            placeId: this.props.clickLat + this.props.clickLng,
            rating: 4
            
        }
        this.props.addNewRestaurant(newRestaurant);
        console.log(newRestaurant)
        // console.log('A review was submitted: ' + this.state.restaurantName);
        this.props.handleClickMap();
        this.props.handleAddRestaurant();
      }

    render() { 
        return ( 
            <div className="addRestaurantFormDiv">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <h5>Add a Restaurant:</h5>
                        <input className="form-control addRestaurantName" id="addRestaurantAuthorName" type="text" placeholder="Restaurant Name:" value={this.state.restaurantName} onChange={this.handleChange} />
                    </div>
                    <button className="btn btn-info btn-sm submitButton" type="submit" value="Submit" >Add Restaurant</button>  
                </form>
            </div>
         );
    }
}
 
export default AddRestaurantForm;