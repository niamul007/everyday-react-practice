import React, { useState } from "react";
export function DogCard(props) {
    const [count, setCount] = useState(0);

    function add() {
        setCount(prevCount=> prevCount + 1)
    }

    function minus(){
        setCount(prevCount => prevCount - 1)
    }

    return(
        <div className="container">
            <img src={props.img} alt={`dog's breed is ${props.breedName}`} className="dog-img" />
            <h2 className="dog-breed">{props.breedName}</h2>
            <p>count : {count}</p>
            <button onClick = { add}>Add count</button>
            <button onClick = {minus}>Delete Count</button>
        </div>
    )
}
export default DogCard;