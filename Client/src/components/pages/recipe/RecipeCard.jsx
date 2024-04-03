import React from 'react';
import { FaHeart, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
    const navigate=useNavigate();

    const handleClick =()=>{
        navigate(`/recipes/${recipe.id}`)
    }
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer" onClick={handleClick}>
      <img className="w-full h-48 rounded-lg rounded-b-none object-cover" src={recipe.img} alt={recipe.title} />
      <div className="px-6 py-4">
        <div className="flex justify-between">
          <div className='w-full'>
            <div className='flex justify-between w-full'>
            <div className="font-bold text-xl mb-2">{recipe.title}</div>
            <div className="mr-2">
              <FaHeart className="inline" /> {recipe.likesCount}
            </div>
            </div>
            <div className="text-gray-700 text-sm">
              <div className="mb-1">
                <span className="mr-2">Difficulty: {recipe.difficulty}</span>
              </div>
              <div>
                <span>Cooking Time: {recipe.cookingTime} </span>
              </div>
              <div>
                <span>Cuisine: {recipe.cuisine} </span>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            {/* <span className="mr-2">
              <FaHeart className="inline" /> {recipe.likesCount}
            </span> */}
          </div>
        </div>
        <div className="text-gray-700 text-sm mt-2">
          <span>
            <FaUser className="inline" /> By {recipe.authorName}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
