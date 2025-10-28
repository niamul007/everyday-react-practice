import React, { useState } from "react";
export function DogCard(props) {
    const [count, setCount] = useState(0);
    function handleClick() {
        setCount(count + 1);
        return count;
    }
    return(
        <div className="container">
            <img src={props.img} alt={`dog's breed is ${props.breedName}`} className="dog-img" />
            <h2 className="dog-breed">{props.breedName}</h2>
            <p>count : {count}</p>
            <button onClick = { handleClick}>Click here</button>
        </div>
    )
}
export default DogCard;