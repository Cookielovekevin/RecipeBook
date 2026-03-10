import { useState, useEffect } from 'react';
import RecipeForm from "./components/RecipeForm";
import RecipeCard from './components/RecipeCard';

function App() {
  const [recipes, setRecipes] = useState(null);

  const fetchRecipes = () => {
   fetch("http://localhost:8080/api/recipes")
      .then(res => res.json())
      .then(data => setRecipes(data))
      .catch(err => console.error("Error fetching recipes:", err));
  }

  useEffect(() => {
    fetchRecipes();
  }, []);

  if (!recipes) return <div>No recipes!</div>;

  return (
    <div style={{ padding: '20px' }}>
      {/* Pass the fetch function so the form can refresh the list after a save */}
      <RecipeForm onRecipeAdded={fetchRecipes} />
      
      <hr />
      <h2>Recipe Gallery</h2>
      <div style={containerStyle}>
        {recipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}

const containerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '20px',
  marginTop: '20px'
};

export default App;
