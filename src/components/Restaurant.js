import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';


const Restaurant = (props) => { 
    const char = "✸"

   

    const openInfoArea = () => {
        // moreInfoToggle();
        const cardRestaurant = document.getElementsByClassName("card");

        for(let i = 0; i < cardRestaurant.length; i++) {
            const infoArea = document.createElement("P");
            cardRestaurant[i].appendChild(infoArea);
            infoArea.setAttribute("class","moreInfoParagraph");
            infoArea.textContent = "Extra restaurant Info goes here";
        }
    }

    // const moreInfoToggle = () => {
    //     let moreInfoArea = document.querySelector(".moreInfoParagraph");
    //     if (moreInfoArea.style.display === "none") {
    //         moreInfoArea.style.display = "block";
    //     } else {
    //         moreInfoArea.style.display = "none";
    //     }
    //   }



    return (
        <div id="card" className="card">
            <h2 className="restaurant-name arial-font">{props.name}</h2>
            <p className="restaurant-address">{props.address}</p>
            <h4 className="arial-font ratings-header">Customer Ratings:</h4>
            <div className="ratingStarDiv">
                <p className="star-symbol">{char.repeat(props.ratingStars)}</p>
                <p className="ratingNumber">{props.ratingStars}</p>
            </div>
            <button variant="info" className="btn btn-info infoButton" onClick={openInfoArea}>Click here for more Info</button>
        </div>
    );
}

export default Restaurant;
