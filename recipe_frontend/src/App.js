import { useState, useEffect } from 'react';
import RecipeForm from "./components/RecipeForm";

function App() {
  const [recipe, setRecipe] = useState(null);

  const fetchRecipes = () => {
    fetch('http://localhost:8080/test')
      .then(response => response.json())
      .then(data => setRecipe(data))
      .catch(err => console.error("Kitchen is closed:", err));
  }

  useEffect(() => {
    fetchRecipes();
  }, []);

  if (!recipe) return <div>No reipces!</div>;

  return (
    <div style={{ padding: '20px' }}>
      <RecipeForm onRecipeAdded = {fetchRecipes}></RecipeForm>
    </div>
  );
}

export default App;
