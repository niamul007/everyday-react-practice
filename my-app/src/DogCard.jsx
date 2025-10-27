import React from "react";
export function DogCard(props) {
    return(
        <div className="container">
            <img src={props.img} alt={`dog's breed is ${props.breedName}`} className="dog-img" />
            <h2 className="dog-breed">{props.breedName}</h2>
        </div>
    )
}
export default DogCard;