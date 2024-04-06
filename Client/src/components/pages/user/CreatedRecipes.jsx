import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RecipeCard from '../recipe/RecipeCard';
import { FaEdit } from "react-icons/fa";
import Button from '../../common/Button';
import { MdDelete } from 'react-icons/md';
import { API } from '../../../utils/axios';
import { toast } from 'react-toastify';
import { setRole } from '../../../redux/actions/actions';


function CreatedRecipes() {
    const user = useSelector((state)=> state.role.user);
    const recipes= user.created_recipes;
    const dispatch = useDispatch();
    
    const handleDelete = async (idOfTheRecipeToDelete) =>{
      console.log('button clicked');
      try {
        const updatedCreatedRecipes = user.created_recipes.filter(
          (recipe) => recipe.id != idOfTheRecipeToDelete
        );
        const updatedUser = { ...user, created_recipes: updatedCreatedRecipes };
        await API.delete(`recipes/${idOfTheRecipeToDelete}`)
        await API.patch(`/users/${user.id}`, updatedUser);
        dispatch(setRole("user", updatedUser));
      } catch (err) {
        console.log(err);
      }
      toast.error('Recipe Deleted :(');
    }
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
            handleClick={()=> handleDelete(recipe.id)} />
            </div>
        </div>
      ))}
    </div>
    </div>
  )
}

export default CreatedRecipes
