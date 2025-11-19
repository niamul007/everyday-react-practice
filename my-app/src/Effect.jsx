import { useState, useEffect } from "react";
import Markdown from "react-markdown";
export default function Effect() {
  const [data, setData] = useState({});
  const [count, setCount] = useState(1);

  function handleClick() {
    setCount((prev) => prev + 1);
  }

  useEffect(() => {
    fetch(`https://swapi.dev/api/people/${count}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [count]);

  console.log(data);

  return (
    <div>
      <h1>Star Wars {count}</h1>
        <Markdown>{`\`\`\`json${JSON.stringify(data, null, 2)}\`\`\``}</Markdown>
      <button onClick={handleClick}>Add</button>
    </div>
  );
}
