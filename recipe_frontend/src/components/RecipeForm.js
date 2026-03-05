import React, {useState} from 'react';

const RecipeForm = ({ onRecipeAdded }) => {
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState(['']);

    const handleIngredientChange = (index,value) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = value;
        setIngredients(newIngredients);
    }

    const addIngredientField = () => {
        setIngredients([...ingredients," "]);
    }
    const removeIngredientField = () => {
        const smaller = [...ingredients].slice(0,[...ingredients].length-1);
        setIngredients(smaller);
    }

    const handleSubmit = (e) =>{
        //stop html default behavior which is to reset the page
        e.preventDefault();

        const newRecipe = {
            title,
            ingredients: ingredients.filter(ing => ing !== ''),
            instructions: { steps: [] }
        };

        fetch('http://localhost:8080/recipes',
            {
                method: 'POST',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify(newRecipe),
            })
            .then(res => res.json())
            .then(data => {
                alert("Recipe Saved!");
                onRecipeAdded();
            })
    }

    return(
        <form onSubmit={handleSubmit}>
            <h2>Add New Recipes</h2>
            <div>
                <label>Title:</label>
                <input value = {title} onChange = {(e) => setTitle(e.target.value)} required></input>
            </div>

            <h3>Ingredients</h3>
            {ingredients.map((ing,index) => (
                <div key={index}>
                    <input value = {ing} onChange = {(e) => handleIngredientChange(index, e.target.value)}
                    placeholder={'Ingredient :D'}></input>
                </div>
            ))}
            <button type ="button" onClick={addIngredientField}> + </button>
            <button type ="button" onClick={removeIngredientField}> - </button>
            <hr></hr>
            <button type="submit"> Submit this jawn</button>
        </form>
    )

}
export default RecipeForm;