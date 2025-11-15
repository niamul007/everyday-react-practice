import React from "react";
import ReactMarkdown from "react-markdown";

export function CloudRecipe(props) {
  return (
    <div className="suggested-recipe-container">
      <ReactMarkdown>{props.recipe}</ReactMarkdown>
    </div>
  );
}
export default CloudRecipe;
