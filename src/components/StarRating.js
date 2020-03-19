import React, { Component } from 'react';
import Star from './Star'

class StarRating extends Component {
    // state = { 
    //     rating: 0
    //  }

    
    // renderStars = () => {
    //     let stars = [];
    //     let maxRating = 5;
    //     for(let i = 0; i < maxRating; i++ ){
    //         stars.push(
    //             <Star 
    //                 key={i}
    //                 setRating={ () => this.handleSetRating(i + 1)}
    //                 isSelected={this.state.rating > i}
    //             />
    //         );
    //     }
    //     return stars;
    // }

    // handleSetRating = (rating) => {
    //     if(this.state.rating === rating) {
    //         this.setState({
    //             rating: 0
    //         });
    //     } else {
    //         this.setState({
    //             rating
    //         });
    //     }
    // } 

    render() {
        
        return ( 
            <ul className="starReviewList">
                {this.props.renderStars()}
            </ul>
         );
    }
}
 
export default StarRating;