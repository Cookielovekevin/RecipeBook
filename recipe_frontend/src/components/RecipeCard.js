import React from 'react';

const RecipeCard = ({recipe}) => {
    return(
        <div style = {cardStyle}>
            <div>
                <h3 style = {{ color: '#2e7d32' }}>{recipe.title}</h3>
                <p>{recipe.instructions.totalTime}</p>
            </div>
            <p><strong>Ingredients: </strong></p>
            <ul>
                {recipe.ingredients.map((ing,i) => (
                    <li key = {i}>{ing}</li>
                ))}
            </ul>

            <p><strong>Instructions: </strong></p>
            <ol>
                {recipe.instructions?.steps?.map((step, i) => (
                <li key={i}>
                    {step.description} <span style={{ color: '#666' }}>({step.minutes} mins)</span>
                </li>
                ))}
            </ol>
        </div>
    )
}

const cardStyle = {
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '15px',
  width: '280px',
  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  backgroundColor: '#f9f9f9'
};

export default RecipeCard;