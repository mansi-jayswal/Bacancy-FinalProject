import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RecipeCard from '../recipe/RecipeCard';
import { FaEdit } from "react-icons/fa";
import Button from '../../common/Button';
import { MdDelete } from 'react-icons/md';
import { API } from '../../../utils/axios';
import { toast } from 'react-toastify';
import { setRole } from '../../../redux/actions/actions';
import SearchBar from '../../common/SearchBar';


function CreatedRecipes() {
    const user = useSelector((state)=> state.role.user);
    const [searchQuery, setSearchQuery] = useState("");

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

    const handleSearch = (query) => {
      setSearchQuery(query);
    };

    const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="container mx-auto px-4 py-4">
      {/* title */}
      <div className="text-center mb-4">
        <h2>{user.name.toUpperCase()}'s creations!</h2>
      </div>

      {/* search bar */}
      <div className="mb-4">
        <SearchBar
          placeholder="Search your Recipes..."
          onSearch={handleSearch}
          value={searchQuery}
        />
      </div>

      {/* recipecards */}
      {filteredRecipes.length === 0 ? (
        <div className="text-center">
          <h1 className="text-xl font-semibold text-customRed">
            No recipes found!
          </h1>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredRecipes.map((recipe) => (
            <div key={recipe.id}>
              <RecipeCard recipe={recipe}  />
              <div className="flex justify-end mt-2">
                <Button
                  children={<MdDelete />}
                  title="delete recipe"
                  handleClick={() => handleDelete(recipe.id)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CreatedRecipes
