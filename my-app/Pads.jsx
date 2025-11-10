import React from "react";

export function Pads(props) {
    // const [onOff,setOnOff] = React.useState(props.on);
    // function toggle(){
    //   console.log(props.id);
    //     setOnOff(prevOnOff => !prevOnOff);
    // }

  return (
    <button onClick= {()=>props.toggle(props.id)} style={{ backgroundColor: `${props.color}` }} className={` ${props.on ? "on" : "button"}`}>
    </button>
  );
}
