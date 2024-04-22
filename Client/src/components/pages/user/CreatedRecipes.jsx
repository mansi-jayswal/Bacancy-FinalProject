import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RecipeCard from '../recipe/RecipeCard';
import { MdDelete } from 'react-icons/md';
import Button from '../../common/Button';
import { API } from '../../../utils/axios';
import { toast } from 'react-toastify';
import { setRole } from '../../../redux/actions/actions';
import SearchBar from '../../common/SearchBar';
import DeleteModal from '../../common/DeleteModal';

function CreatedRecipes() {
    const user = useSelector((state)=> state.role.user);
    const [searchQuery, setSearchQuery] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [recipeToDelete, setRecipeToDelete] = useState(null);

    const recipes= user.created_recipes;
    const dispatch = useDispatch();
    
    const handleDelete = async () =>{
      if (!recipeToDelete) return;
      try {
        const updatedCreatedRecipes = user.created_recipes.filter(
          (recipe) => recipe.id !== recipeToDelete
        );
        const updatedUser = { ...user, created_recipes: updatedCreatedRecipes };
        await API.delete(`recipes/${recipeToDelete}`);
        await API.patch(`/users/${user.id}`, updatedUser);
        dispatch(setRole("user", updatedUser));
        toast.error('Recipe Deleted :(');
        setShowDeleteModal(false);
      } catch (err) {
        console.log(err);
      }
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
        <div className="mb-4 flex justify-center">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-2 w-[90%] mx-auto">
            {filteredRecipes.map((recipe) => (
              <div key={recipe.id}>
                <RecipeCard recipe={recipe} 
                title='Delete the recipe' 
                showButton={true}
                onClick={() => {
                  setRecipeToDelete(recipe.id);
                  setShowDeleteModal(true);
                }}>
                 <MdDelete size={15}/>
                  </RecipeCard>
              </div>
            ))}
          </div>
        )}

        {showDeleteModal && (
          <DeleteModal
            Id={recipeToDelete}
            handleDelete={handleDelete}
            setShowConfirmationModal={setShowDeleteModal}
            setDataIdToBeDeleted={setRecipeToDelete}
            itemType="recipe"
          />
        )}
      </div>
    );
}

export default CreatedRecipes;
