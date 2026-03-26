import { useState, useEffect } from 'react';
import RecipeForm from "./components/RecipeForm";
import RecipeCard from './components/RecipeCard';
import EditingCard from './components/EditingCard';

function App() {
  const [recipes, setRecipes] = useState(null);
  const [editingId, setEditingId] = useState(null);

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
          // r we editing? 
          editingId === recipe.id ? (
            <EditingCard
              key = {recipe.id}
              recipe = {recipe}
              onCancel = {() => setEditingId(null)}
              onUpdate={() => {
                fetchRecipes(); // refresh data
                setEditingId(null);
              }}
            ></EditingCard>
          ) : (
            <RecipeCard
              key = {recipe.id}
              recipe = {recipe}
              onDelete = {fetchRecipes}
              onEdit = {() => setEditingId(recipe.id)}
            ></RecipeCard>
          )
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
