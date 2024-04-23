import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { objects } from '../assets/constObjects'

const recipeDetailsPagePresenter = () => {
    const navigate = useNavigate();
    const recommendationList = useSelector(getRecommendationList);

    const selectedRecipe = objects[0]



    return (
        <recipeDetailsPageView
            name={selectedRecipe.name}
            image={selectedRecipe.image}
            ingredients={selectedRecipe.extendedIngredients}
            instructions={selectedRecipe.analyzedInstructions[0].steps}
        />
    );
};

export default recipeDetailsPagePresenter;