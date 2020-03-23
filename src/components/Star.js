import React from 'react';

const Star = (props) => {
    return (
        <li onClick={props.setRating} className={props.isSelected? 'selected starToClick' : 'starToClick'}>✸</li>
    )
}

export default Star;