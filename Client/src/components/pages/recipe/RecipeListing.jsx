import React, { useState, useEffect } from 'react';
import { getRecipes } from '../../../utils/axios';
import RecipeCard from './RecipeCard';

function RecipeListing() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getRecipes()
      .then(res => setRecipes(res.data))
      .catch(err => console.log(err));
  }, []);

  console.log(recipes)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-2 w-[90%] mx-auto">
      {recipes.map(recipe => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}

export default RecipeListing;

