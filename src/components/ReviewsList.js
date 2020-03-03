import React, { Component } from 'react'
import Review from './Review'

class ReviewsList extends Component {
    constructor(props) {
        super(props);
        this.state = {isToggle: false};
        this.handleClick = this.handleClick.bind(this);
      }
    
      handleClick(e) {
        this.setState({isToggle: !this.state.isToggle});
      }


    render() { 
        return ( 
            <div>
                <button className="btn btn-primary" onClick={this.handleClick}>See Reviews</button>
                <div style={{display: this.state.isToggle? 'block' : 'none'}}>
                    <p>Hello here I am!</p>
                    {this.props.reviews.map( restaurant => 
                        <Review 
                            place_id = {this.props.place_id}

                        />
                    )}
                </div>
            </div>
         );
    }
}
 
export default ReviewsList;