import React from 'react';

const InfoWindow = (props) => {

    const char = "✸"
    // let streetview_url = `https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${props.lat},${props.lng}&heading=151.78&pitch=-0.76&key=${process.env.REACT_APP_GOOGLE_API_KEY}`

    let photo_url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&photoreference=${props.photo.photo_reference}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`

    return (
        <div className="infoWindowPopUp">
            <h5>{props.name}</h5>
            <p>Rating: <span className="star-symbol">{char.repeat(props.rating)}</span><span className="ratingNumber">{props.rating}</span></p>
            <img className="streetviewImage" src={photo_url} alt={props.name}/>
        </div>
    );
}

export default InfoWindow;