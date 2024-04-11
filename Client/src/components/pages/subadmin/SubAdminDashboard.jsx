import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getRecipeById, getRecipes, updateRecipe } from "../../../utils/axios";
import RecipeCard from "../recipe/RecipeCard";
import Loader from "../../common/Loader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Pagination from "../../common/Pagination";

function SubAdminDashboard() {
  const { sub_admin } = useSelector((state) => state.role);
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; 
  const navigate = useNavigate();

  useEffect(() => {
    getRecipes()
      .then((res) => {
        setRecipes(res.data);
        setLoading(false);
        filterRecipes(res.data); 
      })
      .catch((err) => {
        console.log("err in fetching recipes at subadmin", err);
        setLoading(false);
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

  const handleTrending = async (id) => {
    console.log("Trending button clicked for recipe ID:", id);
    try {
      const res = await getRecipeById(id);
      const trendingRecipeData = res.data;

      if (trendingRecipeData.isTrending) {
        const updatedRecipe = { ...trendingRecipeData, isTrending: false };
        await updateRecipe(id, updatedRecipe);
        toast.info("Recipe Removed from top picks!");
      } else {
        const updatedRecipe = { ...trendingRecipeData, isTrending: true };
        await updateRecipe(id, updatedRecipe);
        toast.success("Recipe added to top picks!");
      }
    } catch (error) {
      console.log("Error handling trending:", error);
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const indexOfLastRecipe = currentPage * itemsPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - itemsPerPage;
  const currentRecipes = filteredRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  return (
    <>
      {/* <div className="text-center">
        <h1 className="text-customRed font-semibold">Sub-Admin Dashboard</h1>
      </div> */}
      <div className="text-center mt-4 flex gap-2 flex-col md:flex-row justify-between">
        <h4 className="text-customRed font-semibold md:ml-auto md:mr-96">
          My Category : {sub_admin.assignedCategory} Cuisine
        </h4>
        <button
          onClick={() => navigate("/new-recipe")}
          className="text-customRed font-semibold mr-8"
        >
          +Add new Recipe
        </button>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-2 w-[90%] mx-auto">
            {currentRecipes.length > 0 ? (
              currentRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onClick={() => handleTrending(recipe.id)}
                  showButton={true}
                  title= {
                    recipe.isTrending ? 'Remove from top picks' : 'Add to top picks'
                  }
                >
                 {
                   recipe.isTrending ? 'Remove from top picks' : 'Add to top picks'
                 }
                </RecipeCard>
              ))
            ) : (
              <div className="text-center">
                <h1 className="ml-5">
                  No recipes found from {sub_admin.assignedCategory} cuisine
                </h1>
              </div>
            )}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredRecipes.length / itemsPerPage)}
            onPageChange={paginate}
            itemsPerPage={itemsPerPage}
          />
        </>
      )}
    </>
  );
}

export default SubAdminDashboard;
