import React, { Component } from 'react';
import userLogo from '../images/user.png'

class AddReviewForm extends Component {
    state = { 
        authorValue: "",
        textValue: ""
     }

          
    handleChangeName = (event) => {
        this.setState({
            authorValue: event.target.value,
        });
        // console.log(this.state.authorValue)
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
            profile_photo_url: {userLogo},
            author_url: "#"

        }
        this.props.addNewReview(newReview);
        this.setState({
            authorValue: "",
            textValue: ""
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
                    <textarea className="form-control addReviewText" id="addReviewTextArea" rows="3" placeholder="Type your review here." value={this.state.textValue} onChange={this.handleChangeText}></textarea>
                </div>
                <button className="btn btn-info btn-sm submitButton" type="submit" value="Submit" >Add Review</button>  
            </form>
         );
    }
}
 
export default AddReviewForm;