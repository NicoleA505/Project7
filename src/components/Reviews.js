import React, { Component } from 'react'

class Reviews extends Component {
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
                </div>
            </div>
         );
    }
}
 
export default Reviews;