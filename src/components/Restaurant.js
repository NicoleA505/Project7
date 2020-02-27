import React from 'react'
import Reviews from './Reviews'
import 'bootstrap/dist/css/bootstrap.min.css';


const Restaurant = (props) => { 
    const char = "✸"
    let photo_url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${props.photo[0].photo_reference}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`

    return (
        <div id="card" className="card">
            <h2 className="restaurant-name arial-font">{props.name}</h2>
            <p className="restaurant-address">{props.address}</p>
            <img src={photo_url} alt={props.name}/>
            <h4 className="arial-font ratings-header">Customer Ratings:</h4>
            <div className="ratingStarDiv">
                <p className="star-symbol">{char.repeat(props.ratingStars)}</p>
                <p className="ratingNumber">{props.ratingStars}</p>
            </div>
            <Reviews />
        </div>
    );
}

export default Restaurant;
