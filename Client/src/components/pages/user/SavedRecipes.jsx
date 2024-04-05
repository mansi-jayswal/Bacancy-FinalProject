import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RecipeCard from '../recipe/RecipeCard';
import Button from '../../common/Button';
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';
import { API } from '../../../utils/axios';
import { setRole } from '../../../redux/actions/actions';

function SavedRecipes() {
    const user = useSelector(state => state.role.user);
    const recipes=user.saved_recipes;
    const dispatch = useDispatch();

    const handleRemoveFromSave =  async (idOfTheRecipeToRemove)=>{
        console.log('button clicked');
        try {
          const updatedSavedRecipes = user.saved_recipes.filter(
            (recipe) => recipe.id != idOfTheRecipeToRemove
          );
          const updatedUser = { ...user, saved_recipes: updatedSavedRecipes };
          await API.patch(`/users/${user.id}`, updatedUser);
          dispatch(setRole("user", updatedUser));
        } catch (err) {
          console.log(err);
        }
        toast.error('Recipe removed from save!');

    }
  return (
    <div>
      <div>
        <h2 className='text-center'> {user.name.toUpperCase()} 's Saved Recipes</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-2 w-[90%] mx-auto">
      {recipes.map(recipe => (
        <div key={recipe.id} >
            <RecipeCard key={recipe.id} recipe={recipe} />
            <div className='text-center'>
            <Button 
            children={<MdDelete />}
            handleClick={()=> handleRemoveFromSave(recipe.id)} />
            </div>
        </div>
      ))}
    </div>
    </div>
  )
}

export default SavedRecipes
