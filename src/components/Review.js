import React from 'react'



const Review = (props) => { 
    const char = "✸"

    return (
         <div className="review">
            <div className="reviewAuthorInfo">
                <img src={props.profile_photo_url} alt={props.author}/>
                <a href={props.author_url}>{props.author}</a>
            </div>
            <p>{char.repeat(this.props.rating)}</p>
            <p>{props.text}</p>
            <p>{props.timePosted}</p>
        </div> 
    )
     
}

export default Review;