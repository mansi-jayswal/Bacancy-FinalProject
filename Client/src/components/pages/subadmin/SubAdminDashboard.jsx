import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getRecipeById, getRecipes, updateRecipe } from "../../../utils/axios";
import RecipeCard from "../recipe/RecipeCard";
import Loader from "../../common/Loader";
import { HiTrendingUp } from "react-icons/hi";
import { toast } from "react-toastify";



function SubAdminDashboard() {
  const { sub_admin } = useSelector((state) => state.role);
  const [recipes, setRecipes] = useState([]);
  const [trendingRecipe , setTrendingRecipe] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecipes()
      .then((res) => {
        setRecipes(res.data);
        setLoading(false); // Set loading to false once recipes are fetched
        filterRecipes(recipes);
      })
      .catch((err)  => {
        console.log("err in fetching recipes at subadmin", err);
        setLoading(false); // Set loading to false in case of error
      });
  }, [recipes]);



  const filterRecipes = (recipes) => {
    if (sub_admin && sub_admin.assignedCategory) {
      const filtered = recipes.filter(
        (recipe) =>
          recipe.cuisine.toLowerCase() ===
          sub_admin.assignedCategory.toLowerCase()
      );
      setFilteredRecipes(filtered);
    }
  };
  const handleTrending = async (id) =>{
    console.log('trending button clicked! from recipe id ', id);
     getRecipeById(id)
     .then(res=> setTrendingRecipe(res.data))
     .catch(err=>console.log('error in trending recipe!', err))

     const addRecipeToTrend= {...trendingRecipe , isTrending:true}
     await updateRecipe(id ,addRecipeToTrend)
            .then(res=>console.log('recipe updated',res))
            .catch(err=> console.log('error in updating trending state',err))
    toast.success('recipe added to trend!')


  }

  return (
    <>
      <div className="text-center">
        <h1 className="text-customRed font-semibold">Sub-Admin Dashboard</h1>
      </div>
      <div className="text-center mt-4">
        <h4 className="text-customRed font-semibold">
          My Category : {sub_admin.assignedCategory} Cuisine
        </h4>
      </div>

      {loading ? ( // Conditional rendering based on loading state
        <Loader /> // Show loader if loading is true
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-2 w-[90%] mx-auto">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} onClick={()=>handleTrending(recipe.id)} >
                  <HiTrendingUp size={20}  />
                  
                </RecipeCard>
            ))
          ) : (
            <div className="text-center">
              <h1 className="ml-5">No recipes found from {sub_admin.assignedCategory} cuisine</h1>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default SubAdminDashboard;

