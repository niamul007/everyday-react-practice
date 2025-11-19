import React from "react";
import { Jokes } from "./Jokes.jsx";
import { data } from "./data.js";
import Test from "./Test.jsx";
import Hotel from "./Hotel.jsx";
import Header from "./Header.jsx";
import Body from "./Body.jsx";
import Effect from "./Effect.jsx";
export function App() {
  const jokesData = data.map((item) => {
    return <Jokes key={item.id} {...item} />;
  });
  return (
    <>
      {/* <Test /> */}
      {/* <Hotel /> */}
      <Header />
      <Body />
      {/* {jokesData} */}
      {/* <Effect /> */}
    </>
  );
}

export default App;
