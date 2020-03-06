import React from 'react'



const Review = (props) => { 
    const char = "✸"

    return (
         <div className="review">
            <div className="reviewAuthorInfo">
                <div className="authorInfo">
                    <img
                        className="reviewAuthorImage" 
                        src={props.profile_photo_url} 
                        alt={props.author} 
                        />
                    <a className="reviewAuthorName" href={props.author_url}>{props.author}</a>
                </div>
                <p className="star-symbol">{char.repeat(props.rating)}</p>
            </div>
            <p className="reviewText">{props.text}</p>
            <p className="reviewTimePosted">{props.timePosted}</p>
        </div> 
    )
     
}

export default Review;