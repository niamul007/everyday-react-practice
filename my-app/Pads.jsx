import React from "react";

export function Pads(props) {
  return (
    <button style={{ backgroundColor: `${props.color}` }} className={` ${props.on ? "on" : "button"}`}>
    </button>
  );
}
