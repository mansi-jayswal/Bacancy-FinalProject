import React, { useEffect, useState } from 'react';
import banner from '../../../assets/banner.png';
import Section from '../../common/Section';
import Heading from '../../common/Heading';
import { getRecipes } from '../../../utils/axios';
import RecipeCard from '../recipe/RecipeCard';
import {  useNavigate } from 'react-router-dom';
import Button from '../../common/constants/Button';

function Home() {
  const [recipes, setRecipes] = useState([]);
  const navigate=useNavigate();

  useEffect(() => {
    getRecipes()
      .then(res => setRecipes(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleClick=()=>{
    navigate('/recipes')
  }


  const filteredRecipes = recipes.filter(recipe => recipe.cuisine.toLowerCase() === 'indian');

  return (
    <div className="relative">
      <img src={banner} alt="banner" className="w-full h-auto mr-4 " />
      
      {/* category round images */}
      <Section /> 
      {/* recommended for you */}
      <Heading text="Recommended for you" />  
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-2 w-[90%] mx-auto">
        {filteredRecipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

       <div className='flex justify-center m-2 '>
        <Button handleClick={handleClick} children="Browse all recipes"/>
      </div>
    </div>
  );
}

export default Home;
