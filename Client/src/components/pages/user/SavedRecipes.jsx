import React from 'react'
import { useSelector } from 'react-redux'
import RecipeCard from '../recipe/RecipeCard';

function SavedRecipes() {
    const user = useSelector(state => state.role.user);
    const recipes=user.saved_recipes;

  return (
    <div>
      <div>
        <h2 className='text-center'> {user.name.toUpperCase()} 's Saved Recipes</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-2 w-[90%] mx-auto">
      {recipes.map(recipe => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
    </div>
  )
}

export default SavedRecipes
