import React from "react";
import "./index.css";
import { Ingredients } from "./Ingredients.jsx";
import CloudRecipe from "./CloudRecipe.jsx";
import { runInference } from "./ai.js";

export default function Hotel() {

  const [ingredients, setIngredients] = React.useState([]);
  const [recipe, setRecipe] = React.useState("");
  const recipeRef = React.useRef(null);


  React.useEffect(() => {
    if (recipe && recipeRef.current) {
      recipeRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [recipe]);
  
  const ingredientsListItems = ingredients.map((ingredient) => (
    <li key={ingredient}>{ingredient}</li>
  ));

  async function fetchRecipe() {
    const aiRecipe = await runInference(ingredients.join(", "));
    setRecipe(aiRecipe);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newIngredient = formData.get("ingredient");
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
    event.currentTarget.reset();
  }

  return (
    <main>
      <form onSubmit={handleSubmit} className="add-ingredient-form">
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button>Add ingredient</button>
      </form>
      {
        ingredients.length > 0 && (
          <Ingredients
            fetchRecipe={fetchRecipe}
            ingredientsListItems={ingredientsListItems}
            ingredients={ingredients}
            ref={recipeRef}
          />
        )
      }
      {recipe && <CloudRecipe recipe={recipe} />}
    </main>
  );
}
