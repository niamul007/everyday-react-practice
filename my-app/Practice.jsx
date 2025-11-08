import React from "react";
import { pads } from "./pads.js";
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
  const [pads, setpads] = React.useState(pads);
  const showPads = pads.map((pad) => {
    return (
      <button key={pad.id} style={{ backgroundColor: pad.color }}>
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
