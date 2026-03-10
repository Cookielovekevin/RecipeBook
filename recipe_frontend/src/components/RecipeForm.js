import React, {useState} from 'react';

const RecipeForm = ({ onRecipeAdded }) => {
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState(['']);
    const [steps, setSteps] = useState([{description: '', minutes: 0}])

    const handleIngredientChange = (index,value) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = value;
        setIngredients(newIngredients);
    }

    const addIngredientField = () => {
        setIngredients([...ingredients," "]);
    }
    const removeIngredientField = () => { if(ingredients.length > 1) setIngredients(ingredients.slice(0,-1));
    }
    const handleStepChange = (index, field, value) => {
        const newSteps = [...steps];
        newSteps[index][field] = value;
        setSteps(newSteps);
    }
    const addStepField = () => setSteps([...steps, {description: ' ', minutes: 0}]);

    const removeStepField = () => {
        if(steps.length > 1) setSteps(steps.slice(0,-1));
    }

    const handleSubmit = (e) =>{
        //stop html default behavior which is to reset the page
        e.preventDefault();

        const newRecipe = {
            title: title,
            ingredients: ingredients.filter(ing => ing !== ''),
            instructions: { 
                steps: steps.filter(s => s.description.trim() !== '')
             }
        };

        fetch('http://localhost:8080/api/recipes',
            {
                method: 'POST',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify(newRecipe),
            })
            .then(res => {
                if(!res.ok) throw new Error("Failed to save D:");
                return res.json();
            })
            .then(data => {
                alert("Recipe Saved!");
                setTitle('');
                setIngredients(['']);
                setSteps([{description: '', minutes: 0}])
                onRecipeAdded();
            })
            .catch(err => alert("Error: " + err.message));
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

            <h3>Cooking Steps</h3>
            {steps.map((step, index) => (
                <div key = {index}>
                    <input
                        placeholder='Step stuf'
                        value = {step.description}
                        onChange = {(e) => handleStepChange(index, 'description', e.target.value)}
                    ></input>
                    <input
                        type = "number"
                        placeholder='minutes'
                        value = {step.minutes}
                        onChange={(e) => handleStepChange(index, 'minutes', parseInt(e.target.value) || 0)}
                    >
                    </input>
                </div>
            ))}
            <button type="button" onClick={addStepField}>+ Step</button>
            <button type="button" onClick={removeStepField}>- Step</button>
            <button type="submit"> Submit this jawn</button>
        </form>
    )

}
export default RecipeForm;