import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getRecipes } from "../../../utils/axios";
import RecipeCard from "./RecipeCard";
import SearchBar from "../../common/SearchBar";
import Loader from "../../common/Loader";
import Button from "../../common/Button";

function RecipeListing() {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [filterCuisine, setFilterCuisine] = useState("All");
  const [sortingOption, setSortingOption] = useState("default");
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  // const navigate = useNavigate();

  useEffect(() => {
    getRecipes()
      .then((res) => {
        setRecipes(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const clearFilters = () => {
    setFilterDifficulty("All");
    setFilterType("All");
    setFilterCuisine("All");
    setSortingOption("default");
    setSearchQuery("");
  };

  const queryParams = new URLSearchParams(location.search);
  const cuisine = queryParams.get("cuisine");
  const filteredRecipesByCuisine = cuisine
    ? recipes.filter((recipe) => recipe.cuisine === cuisine)
    : recipes;

  const filteredRecipes = filteredRecipesByCuisine.filter((recipe) => {
    if (
      filterDifficulty !== "All" &&
      recipe.difficulty.toLowerCase() !== filterDifficulty.toLowerCase()
    ) {
      return false;
    }
    if (
      filterType !== "All" &&
      recipe.type.toLowerCase() !== filterType.toLowerCase()
    ) {
      return false;
    }
    if (
      filterCuisine !== "All" &&
      recipe.cuisine.toLowerCase() !== filterCuisine.toLowerCase()
    ) {
      return false;
    }
    if (
      searchQuery &&
      !recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !recipe.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
    ) {
      return false;
    }
    return true;
  });

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSortChange = (e) => {
    setSortingOption(e.target.value);
  };

  const sortRecipes = (recipes, sortingOption) => {
    switch (sortingOption) {
      case "ascending":
        return [...recipes].sort((a, b) => a.title.localeCompare(b.title));
      case "descending":
        return [...recipes].sort((a, b) => b.title.localeCompare(a.title));
      case "lowToHigh":
        return [...recipes].sort((a, b) => {
          const timeA = parseInt(a.cookingTime.split(" ")[0]);
          const timeB = parseInt(b.cookingTime.split(" ")[0]);
          return timeA - timeB;
        });
      case "highToLow":
        return [...recipes].sort((a, b) => {
          const timeA = parseInt(a.cookingTime.split(" ")[0]);
          const timeB = parseInt(b.cookingTime.split(" ")[0]);
          return timeB - timeA;
        });
      default:
        return recipes;
    }
  };

  const sortedRecipes = sortRecipes(filteredRecipes, sortingOption);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search bar and filters */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 space-y-4 md:space-y-0">
        <div className="md:w-1/2">
          <SearchBar
            placeholder="Search any Recipe or tags..."
            onSearch={handleSearch}
            value={searchQuery}
          />
        </div>
        <div className="flex space-x-4 md:w-1/2">
          {/* Difficulty dropdown */}
          <select
            className="appearance-none px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-yellow-400"
            value={filterDifficulty}
            onChange={(e) => setFilterDifficulty(e.target.value)}
          >
            <option value="All">All Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
          {/* Type dropdown */}
          <select
            className="appearance-none px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-yellow-400"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="All">All Type</option>
            <option value="veg">Veg</option>
            <option value="nonveg">Non-Veg</option>
          </select>

          {/* Cuisine dropdown */}
          {!cuisine ? (
            <select
              className="appearance-none px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-yellow-400"
              value={filterCuisine}
              onChange={(e) => setFilterCuisine(e.target.value)}
            >
              <option value="All">All Cuisines</option>
              {Array.from(new Set(recipes.map((recipe) => recipe.cuisine))).map(
                (cuisine) => (
                  <option key={cuisine} value={cuisine}>
                    {cuisine}
                  </option>
                )
              )}
            </select>
          ) : null}

          {/* Sorting dropdown */}
          <select
            className="appearance-none px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-yellow-400"
            value={sortingOption}
            onChange={handleSortChange}
          >
            <option value="default">Sort by</option>
            <option value="ascending">Title (A-Z)</option>
            <option value="descending">Title (Z-A)</option>
            <option value="lowToHigh">Cooking Time(Lowest)</option>
            <option value="highToLow">Cooking Time(Highest)</option>
          </select>
        </div>
      </div>

      {/* Recipes */}
      {loading ? (
        <Loader />
      ) : sortedRecipes.length === 0 ? (
        <div className="text-center">
          <h1 className="text-xl text-customRed font-semibold">
            No recipes Found!
          </h1>
          <Button children="Show All" handleClick={clearFilters} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-2 w-[90%] mx-auto">
          {sortedRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}

export default RecipeListing;
