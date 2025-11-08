import React from "react";
import "./pads.css";
import { padsData } from "./pads.js";
export default function App() {
  /**
   * Challenge part 1:
   * 1. Initialize state with the default value of the
   *    array pulled in from pads.js
   * 2. Map over that state array and display each one
   *    as a <button> (CSS is already written for you)
   *    (Don't worry about using the "on" or "color"
   *    properties yet)
   */
  const [pads, setpads] = React.useState(padsData);
  const showPads = pads.map((pad) => {
    let darkMode = false ;
    return (
      <button key={pad.id} style={{ backgroundColor:`${darkMode?"#2222":"#cccc"} `}}>
        {pad.label}
      </button>
    );
  });
  return (
    <main>
      <div className="pad-container">{showPads}</div>
    </main>
  );
}
