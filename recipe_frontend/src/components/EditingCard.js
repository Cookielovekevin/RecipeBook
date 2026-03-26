import React, {useState} from 'react';

const EditingCard = ({recipe, onCancel, onUpdate}) => {
    const [form, setForm] = useState({...recipe});

    //handle changing ingredients
    const handleIngredientChange = (index, value) => {
        const updatedIngredients = [...form.ingredients];
        updatedIngredients[index] = value;
        setForm({...form, ingredients:updatedIngredients});
    };

    //handle changing the steps (steps make up instructions)
    const handleStepChange = (index,value) => {
        const updatedSteps = [...form.instructions.steps];
        updatedSteps[index] = {...updatedSteps[index], description: value}; 
        setForm({...form, instructions: {...form.instructions, steps: updatedSteps}});
    };

    const handleSave = () => {
       fetch(`http://localhost:8080/api/recipes/${recipe.id}`, {
            method: 'PUT', // Technology: REST PUT
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        })
        .then(res => {
            if (res.ok) onUpdate(); // Refresh the list and close edit mode
            else alert("failed to update recipe");
        });
    };

    return (
        <div>
            <h3>Editing: {recipe.title}</h3>

            <label>Title:</label>
            <input 
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <p><strong>Ingredients: </strong></p>
            {form.ingredients.map((ingredients, i) => (
                <input
                    key = {i}
                    value = {ingredients}
                    onChange = {(e) => handleIngredientChange(i, e.target.value)}
                    ></input>
            ))}

            
            <p><strong>Instructions (STEPS): </strong></p>
            {form.instructions?.steps?.map((step, i) => (
            <div key={i}>
                <label>Step {i + 1}:</label>
                <input
                    value={step.description} // Point specifically to description
                    onChange={(e) => handleStepChange(i, e.target.value)}
                />
            </div>
            ))}

            <div>
                <button onClick = {handleSave}>Save Change</button>
                <button onClick = {onCancel}>SIKE</button>
            </div>
        </div>
    )
   
}
export default EditingCard;