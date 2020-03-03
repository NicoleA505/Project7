import React, { Component } from 'react'
import ReviewsList from './ReviewsList'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'



class Restaurant extends Component { 
    // let photo_url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${props.photo[0].photo_reference}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`

    state = {
        reviews: []
    }


    getReviews = () => {
      let url2 = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${this.props.place_id}&fields=name,review&key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
      const proxyurl = "https://cors-anywhere.herokuapp.com/";
      let url = proxyurl + url2;
      axios.get(url)
        .then(response => {
          console.log(response.data.result);
          this.setState({
              reviews: response.data.result
          });
        })
        .catch( error => {
          // handle error
          console.log(error);
        })
    };

    componentDidMount = () => {
        this.getReviews()
    }



    render(){
        const char = "✸"
        // console.log(this.state.reviews)
        return (
            <div id="card" className="card">
                <h2 className="restaurant-name arial-font">{this.props.name}</h2>
                <p className="restaurant-address">{this.props.address}</p>
                {/* <img src={photo_url} alt={this.props.name}/> */}
                <h4 className="arial-font ratings-header">Customer Ratings:</h4>
                <div className="ratingStarDiv">
                    <p className="star-symbol">{char.repeat(this.props.ratingStars)}</p>
                    <p className="ratingNumber">{this.props.ratingStars}</p>
                </div>
                <ReviewsList 
                    place_id = {this.props.place_id}
                    reviews = {this.state.reviews.reviews}
                />
            </div>
        );
    }
}

export default Restaurant;
