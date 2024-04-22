import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RecipeCard from "./RecipeCard";
import { getRecipes } from "../../../utils/axios";
import Button from "../../common/Button";

function RecipeByTag() {
  const { tag } = useParams();
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getRecipes()
      .then((res) => setRecipes(res.data))
      .catch((err) => console.log(err));
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.tags.some(
      (recipeTag) =>
        recipeTag.toLowerCase().includes(tag.toLowerCase()) ||
        tag.toLowerCase().startsWith(recipeTag.toLowerCase())
    )
  );

  return (
    <div>
      {filteredRecipes.length === 0 ? (
        <div className="text-center">
          <h2 className="font-semibold text-customRed mb-4">
            No recipes found with tag: {tag}
          </h2>
          <Button
            children="Show all recipes"
            handleClick={() => navigate("/recipes")}
          />
        </div>
      ) : (
        <div>
          <div className="text-center">
            <h2 className="font-semibold text-customRed mb-4">
              Recipes with tag: {tag}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-2 w-[90%] mx-auto mb-6">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default RecipeByTag;
