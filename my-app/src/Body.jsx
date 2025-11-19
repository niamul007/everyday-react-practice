import { use, useState } from "react";
import { useEffect } from "react";

export default function Body() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "",
  });

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setData(data.data.memes));
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  function handleClick() {
    const randomNumber = Math.floor(Math.random() * data.length);
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: data[randomNumber]?.url,
    }));
    setCount((prevCount) => prevCount + 1);
  }

  return (
    <main>
      <div className="form">
        <label>
          Top Text
          <input
            type="text"
            placeholder="One does not simply"
            name="topText"
            onChange={handleChange}
          />
        </label>

        <label>
          Bottom Text
          <input
            type="text"
            placeholder="Walk into Mordor"
            name="bottomText"
            onChange={handleChange}
          />
        </label>
        <button onClick={handleClick}>Get a new meme image 🖼</button>
      </div>
      <div className="meme">
        {meme.randomImage && <img src={meme.randomImage} alt="meme" />}
        <span className="top">{meme.topText}</span>
        <span className="bottom">{meme.bottomText}</span>
      </div>
    </main>
  );
}
