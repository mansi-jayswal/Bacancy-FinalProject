import React from 'react'
import { useSelector } from 'react-redux'
import RecipeCard from '../recipe/RecipeCard';
import { FaEdit } from "react-icons/fa";
import Button from '../../common/Button';
import { MdDelete } from 'react-icons/md';


function CreatedRecipes() {
    const user = useSelector((state)=> state.role.user);
    const recipes= user.created_recipes;
  return (
    <div>
      <div className='text-center'>
        <h2>{user.name}'s creations!</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-2 w-[90%] mx-auto">
      {recipes.map(recipe => (
        <div key={recipe.id} >
            <RecipeCard key={recipe.id} recipe={recipe} />
            <div className='flex justify-end m-2'>
            <Button 
            children={<MdDelete />}
            title='delete recipe'
            handleClick={()=> handleRemoveFromSave(recipe.id)} />
            <Button 
            children={<FaEdit />}
            title='edit recipe'
            handleClick={()=> handleRemoveFromSave(recipe.id)} />
            </div>
        </div>
      ))}
    </div>
    </div>
  )
}

export default CreatedRecipes
