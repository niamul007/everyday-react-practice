import React from "react";

export function Jokes(props) {
    const [ishown, setIshown] = React.useState(false);

    function handleClick(){
        setIshown(prev => !prev)
    }
    return(
        <div className="container">
            <div className="jokes">
                <h4 className="setup">{props.setup}</h4>
                {ishown === true &&
                <p className="punchline">{props.punchline}</p>}
                <button onClick={handleClick}>{ishown ? "Hide Punchline" :"Show Punchline"}</button>
            </div>
        </div>
    )
}