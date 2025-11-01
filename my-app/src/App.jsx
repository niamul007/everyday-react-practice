import React from "react";
import { Jokes } from "./Jokes.jsx";
import { data } from "./data.js";

export function App() {
  const jokesData = data.map((item) => {
    return <Jokes key={item.id} {...item} />;
  });
  return <>{jokesData}</>;
}

export default App;
