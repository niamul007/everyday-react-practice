import React from "react"

export default function Test() {
  const [myFavoriteThings, setMyFavoriteThings] = React.useState([])
  
  const allFavoriteThings = ["💦🌹", "😺", "💡🫖", "🔥🧤", "🟤🎁", 
  "🐴", "🍎🥧", "🚪🔔", "🛷🔔", "🥩🍝"]
  const thingsElements = myFavoriteThings.map(thing => <p key={thing}>{thing}</p>)

  function addFavoriteThing() {
    /**
     * Challenge: you do it!
     * Every time "Add item" is clicked, it should add another string
     * "Test" to the list on the page
     */
    setMyFavoriteThings(prev => [...prev , `test ${prev.length + 1}`])
  }
  
  return (
    <main>
      <button onClick={addFavoriteThing}>Add item</button>
      <section aria-live="polite">
        {thingsElements}
      </section>
    </main>
  )
}