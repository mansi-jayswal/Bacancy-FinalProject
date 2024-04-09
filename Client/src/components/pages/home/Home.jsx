import React, { useEffect, useState } from 'react';
import banner from '../../../assets/banner.png';
import Section from '../../common/Section';
import Heading from '../../common/Heading';
import { getRecipes } from '../../../utils/axios';
import RecipeCard from '../recipe/RecipeCard';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../common/Button';

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [trendingReicpes, setTrendingReicpes] = useState([]);
  const user = useSelector((state) => state.role.user);
  const navigate = useNavigate();

  useEffect(() => {
    getRecipes()
      .then((res) => {
        setRecipes(res.data);
        filterRecipes(res.data);
        findTrendingRecipes(res.data)
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    filterRecipes(recipes);
    findTrendingRecipes(recipes)
  }, [recipes, user]);

  const findTrendingRecipes =(recipes) =>{
    const trendingRecipes = recipes.filter(recipe => recipe.isTrending === true);
    setTrendingReicpes(trendingRecipes);
  }

  const filterRecipes = (recipes) => {
    if (user && user.preference) {
      const filtered = recipes.filter(
        (recipe) => recipe.cuisine.toLowerCase() === user.preference.toLowerCase()
      );
      setFilteredRecipes(filtered);
    }
  };

  const handleClick = () => {
    navigate('/recipes');
  };

  return (
    <div className="relative">
      <img src={banner} alt="banner" className="w-full h-auto mr-4 " />

      {/* category round images */}
      <Section />
    {/* Top picks of the month */}
    <Heading text="Top Picks of the Month" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-2 w-[90%] mx-auto">
        {trendingReicpes.length > 0 ? (
          trendingReicpes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)
        ) : (
          <div className='text-center'>
            <h1>Please login to see recomanded recipes for you!</h1>
          </div>
        )}
      </div>

      {/* recommended for you */}
      <Heading text="Recommended for you" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-2 w-[90%] mx-auto">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)
        ) : (
          <div className='text-center'>
            <h1>Please login to see recomanded recipes for you!</h1>
          </div>
        )}
      </div>

      <div className="flex justify-center m-2 ">
        <Button
        handleClick={handleClick}>Browse all recipes</Button>
      </div>
    </div>
  );
}

export default Home;
