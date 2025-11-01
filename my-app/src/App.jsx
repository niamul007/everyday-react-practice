import React from "react";
import { Jokes } from "./Jokes.jsx";
import { data } from "./data.js";
import Test from "./Test.jsx";
export function App() {
  const jokesData = data.map((item) => {
    return <Jokes key={item.id} {...item} />;
  });
  return <>
  <Test />
  </>;
}

export default App;
