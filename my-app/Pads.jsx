import React from "react";

export function Pads(props) {
    const [onOff,setOnOff] = React.useState(props.on);
    function toggle(){
        setOnOff(prevOnOff => !prevOnOff);
    }
  return (
    <button onClick={toggle} style={{ backgroundColor: `${props.color}` }} className={` ${onOff ? "on" : "button"}`}>
    </button>
  );
}
