import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getRecipeById, getRecipes, updateRecipe } from "../../../utils/axios";
import RecipeCard from "../recipe/RecipeCard";
import Loader from "../../common/Loader";
import { HiTrendingUp } from "react-icons/hi";
import { TiTick } from "react-icons/ti";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function SubAdminDashboard() {
  const { sub_admin } = useSelector((state) => state.role);
  const [recipes, setRecipes] = useState([]);
  const [trendingRecipe , setTrendingRecipe] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate= useNavigate();
  // const [trendEmogi , setTrendEmogi] = useState( <HiTrendingUp size={20}  />)

  useEffect(() => {
    getRecipes()
      .then((res) => {
        setRecipes(res.data);
        setLoading(false); 
        filterRecipes(recipes);
      })
      .catch((err)  => {
        console.log("err in fetching recipes at subadmin", err);
        setLoading(false); 
      });
  }, [recipes, trendingRecipe]);



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
  // const handleTrending = async (id) =>{
  //   console.log('trending button clicked! from recipe id ', id);
  //    getRecipeById(id)
  //    .then(res=> setTrendingRecipe(res.data))
  //    .catch(err=>console.log('error in trending recipe!', err))
  //    console.log(trendingRecipe);
  //    if(trendingRecipe.isTrending){
  //     toast.warn('Recipe already in trend!');
  //     trendingRecipe([]);
  //     return;
  //    }
  //    else {
  //      const addRecipeToTrend= {...trendingRecipe , isTrending:true}
  //      await updateRecipe(id ,addRecipeToTrend)
  //             .then(res=>console.log('recipe updated',res))
  //             .catch(err=> console.log('error in updating trending state',err))
  //     toast.success('recipe added to trend!')
  //    }

  //   // setTrendEmogi(<TiTick size={20} />)
  // }

  const handleTrending = async (id) => {
    console.log('Trending button clicked for recipe ID:', id);
    try {
      const res = await getRecipeById(id);
      const trendingRecipeData = res.data;
      
      // Check if trendingRecipeData is already trending
      if (trendingRecipeData.isTrending) {
        toast.warn('Recipe already in trend!');
      } else {
        // Update recipe's isTrending property to true
        const updatedRecipe = { ...trendingRecipeData, isTrending: true };
        await updateRecipe(id, updatedRecipe);
        toast.success('Recipe added to trend!');
      }
    } catch (error) {
      console.log('Error handling trending:', error);
      toast.error('Error handling trending!');
    }
  };
  

  return (
    <>
      <div className="text-center">
        <h1 className="text-customRed font-semibold">Sub-Admin Dashboard</h1>
      </div>
      <div className="text-center mt-4 flex justify-between">
        <h4 className="text-customRed font-semibold ml-auto mr-96">
          My Category : {sub_admin.assignedCategory} Cuisine
        </h4>
        <button onClick={()=>navigate('/new-recipe')} className="text-customRed font-semibold mr-8 ">
          +Add new Recipe
        </button>
      </div>

      {loading ? ( 
        <Loader /> 
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-2 w-[90%] mx-auto">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} onClick={()=>handleTrending(recipe.id)} >
                  <HiTrendingUp size={20}  />
                  {/* {trendEmogi} */}
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

