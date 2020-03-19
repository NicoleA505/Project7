import React from 'react';

const StarRating = (props) => {
        
    return ( 
        <ul className="starReviewList">
            {props.renderStars()}
        </ul>
        );
    
}
 
export default StarRating;