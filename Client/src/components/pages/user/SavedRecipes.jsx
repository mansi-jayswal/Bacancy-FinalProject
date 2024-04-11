import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RecipeCard from "../recipe/RecipeCard";
import Button from "../../common/Button";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { API, updateUser } from "../../../utils/axios";
import { setRole } from "../../../redux/actions/actions";
import SearchBar from "../../common/SearchBar";
import { GoBookmarkSlashFill } from "react-icons/go";


function SavedRecipes() {
  const user = useSelector((state) => state.role.user);
  const recipes = user.saved_recipes;
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  const handleRemoveFromSave = async (idOfTheRecipeToRemove) => {
    console.log("button clicked");
    try {
      const updatedSavedRecipes = user.saved_recipes.filter(
        (recipe) => recipe.id != idOfTheRecipeToRemove
      );
      const updatedUser = { ...user, saved_recipes: updatedSavedRecipes };
      try {
        const res = await updateUser(user.id, updatedUser);
        if (res.success) {
          dispatch(setRole("user", updatedUser));
        } else {
          console.log("error in updating the user from saveRecipe");
        }
      } catch (error) {
        console.log(error);
      }
    } catch (err) {
      console.log(err);
    }
    toast.error("Recipe removed from save!");
  };

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
        <h2 className="text-center">
          {" "}
          {user.name.toUpperCase()} 's Saved Recipes
        </h2>
      </div>

      {/* search bar */}
      <div className="mb-4 flex justify-center">
        <SearchBar
          placeholder="Search your Recipes..."
          onSearch={handleSearch}
          value={searchQuery}
        />
      </div>

      {
        filteredRecipes.length==0 ?
        <div className="text-center">
          <h1 className="text-xl font-semibold text-customRed">
            No recipes found!
          </h1>
        </div>
        :
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-2 w-[90%] mx-auto">
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id}>
            <RecipeCard key={recipe.id} recipe={recipe}
             showButton={true} 
             title='Remove from save'
             onClick={() => handleRemoveFromSave(recipe.id)}
             >
              <GoBookmarkSlashFill size={15}/>
              </RecipeCard>
          </div>
        ))}
      </div>
          }
    </div>
  );
}

export default SavedRecipes;
