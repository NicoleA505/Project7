import React, { Component } from 'react';
import StarRating from './StarRating'
import Star from './Star'


class AddReviewForm extends Component {
    state = { 
        authorValue: "",
        textValue: "",
        rating: 0
     }

          
    handleChangeName = (event) => {
        this.setState({
            authorValue: event.target.value,
        });
        // console.log(this.state.authorValue)
    }

    renderStars = () => {
        let stars = [];
        let maxRating = 5;
        for(let i = 0; i < maxRating; i++ ){
            stars.push(
                <Star 
                    key={i}
                    setRating={ () => this.handleSetRating(maxRating - i)}
                    isSelected={this.state.rating > i}
                />
            );
        }
        return stars;
    }

    handleSetRating = (rating) => {
        if(this.state.rating === rating) {
            this.setState({
                rating: 0
            });
        } else {
            this.setState({
                rating
            });
        }
    } 

    handleChangeText = (event) => {
        this.setState({
            textValue: event.target.value
        });
        // console.log(this.state.textValue)
    }

    handleSubmit = (event) => {
        event.preventDefault();

        let newReview = {
            author_name: this.state.authorValue,
            text: this.state.textValue,
            profile_photo_url: require('../images/user.png'),
            author_url: "#",
            rating: this.state.rating

        }
        this.props.addNewReview(newReview);
        this.setState({
            authorValue: "",
            textValue: "",
            rating: 0
        })
        console.log(newReview)
        console.log('A review was submitted: ' + this.state.authorValue + ", " + this.state.textValue);
      }


    render() { 
        return ( 
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <h5>Add a Review:</h5>
                    <input className="form-control addReviewName" id="addReviewAuthorName" type="text" placeholder="Your name:" value={this.state.authorValue} onChange={this.handleChangeName} />
                    <p className="starRatingText">What would you rate this restaurant?</p>
                    <StarRating 
                        renderStars={this.renderStars}
                        handleSetRating={this.handleSetRating}
                    />
                    <textarea className="form-control addReviewText" id="addReviewTextArea" rows="3" placeholder="Type your review here." value={this.state.textValue} onChange={this.handleChangeText}></textarea>
                </div>
                <button className="btn btn-info btn-sm submitButton" type="submit" value="Submit" >Add Review</button>  
            </form>
         );
    }
}
 
export default AddReviewForm;