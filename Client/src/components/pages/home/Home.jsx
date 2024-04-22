import React, { useEffect, useState } from "react";
import banner from "../../../assets/banner.png";
import tagline from "../../../assets/tagline.png";
import branding from "../../../assets/branding.png";
import Section from "../../common/Section";
import Heading from "../../common/Heading";
import { getRecipes } from "../../../utils/axios";
import RecipeCard from "../recipe/RecipeCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../common/Button";
import { TbToolsKitchen3 } from "react-icons/tb";
import { FaLongArrowAltRight } from "react-icons/fa";
import NewsLetterSub from "../../common/NewsLetterSub";
import SliderComponent from "../../common/SliderComponent";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [trendingRecipes, settrendingRecipes] = useState([]);
  const user = useSelector((state) => state.role.user);
  const navigate = useNavigate();

  useEffect(() => {
    getRecipes()
      .then((res) => {
        setRecipes(res.data);
        filterRecipes(res.data);
        findTrendingRecipes(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    filterRecipes(recipes);
    findTrendingRecipes(recipes);
  }, [recipes, user]);

  const findTrendingRecipes = (recipes) => {
    const trendingRecipes = recipes.filter(
      (recipe) => recipe.isTrending === true
    );
    settrendingRecipes(trendingRecipes);
  };

  const filterRecipes = (recipes) => {
    if (user && user.preference) {
      const filtered = recipes.filter(
        (recipe) =>
          recipe.cuisine.toLowerCase() === user.preference.toLowerCase()
      );
      setFilteredRecipes(filtered);
    }
  };

  const handleClick = () => {
    navigate("/recipes");
  };

  return (
    <>
      {/* tagline div */}
      <div className="text-center bg-customRed">
        <p className="text-white text-xs lg:text-xl py-4 md:py-2 flex justify-center items-center font-dancing">
          <TbToolsKitchen3 size={20} className="text-yellow-400 mr-2" />
          <strong className="ml-1">
            From Kitchen Creations to Culinary Connections!
          </strong>
        </p>
      </div>

      <div className="relative overflow-x-hidden">
        <img src={banner} alt="banner" className="max-w-full h-auto " />
        {/* category round images */}
        <div className="mx-auto max-w-full h-auto">

        <Section />
        </div>

        {/* Top picks of the month */}
        {trendingRecipes ? (
          <>
            {/* Caraousal component  */}
            <Heading text={"Top Picks of the Month!"} showIcon={true} />
            <div className="m-4 ">
              {trendingRecipes.length > 0 ? (
                // trendingRecipes.map((recipe) =>
                // (
                //   <RecipeCard key={recipe.id} recipe={recipe} />
                // ))
                <SliderComponent trendingRecipes={trendingRecipes} />
              ) : (
                <div className="text-center mr-6">
                  <h1>No Recipes in trend!</h1>
                </div>
              )}
            </div>
          </>
        ) : //   <>
        //   {/* simple listing without caraousal */}
        //   <Heading text="Top Picks of the Month" />
        // <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-2 w-[90%] mx-auto">
        //   {trendingRecipes.length > 0 ? (
        //     trendingRecipes.map((recipe) => (
        //       <RecipeCard key={recipe.id} recipe={recipe} />
        //     ))
        //   ) : (
        //     <div className="text-center mr-6">
        //       <h1>No Recipes in trend!</h1>
        //     </div>
        //   )}
        // </div>
        //   </>

        null}

        {/* recommended for you */}
        <Heading text="Recommended for you!" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-2 w-[90%] mx-auto">
          {filteredRecipes.length > 0
            ? filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))
            : recipes
                .slice(3, 6)
                .map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
        </div>
        {!user ? (
          <div className="text-center mt-2">
            <h1 className="mt-8 p-2 font-semibold font-dancing text-yellow-800">
              Login to see recipes of your taste!{" "}
              <FaLongArrowAltRight
                className="inline text-yellow-800 cursor-pointer"
                onClick={() => navigate("/login")}
              />
            </h1>
          </div>
        ) : null}
        <div className="flex justify-center m-2 ">
          <Button handleClick={handleClick}>Browse all recipes</Button>
        </div>

        <div className="text-center">
          <img
            src={branding}
            alt="branding"
            className="mx-auto max-w-full h-auto"
          />
        </div>

        <div>
          <NewsLetterSub />
        </div>
       
      </div>
    </>
  );
}

export default Home;
