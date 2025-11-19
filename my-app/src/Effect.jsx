import { useState, useEffect } from "react";

export default function Effect() {
  const [data, setData] = useState({});
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("https://api.chucknorris.io/jokes/random")
      .then(res => res.json())
      .then(data => setData(data));
  }, [count]);

  function handleClick() {
    setCount(prev => prev + 1);
    console.log("btn clicked");
  }

  console.log(data);

  return (
    <div>
      <h1>Chuck Norris {count}</h1>
      <p>{data.value}</p>
      <button onClick={handleClick}>Add</button>
    </div>
  );
}
