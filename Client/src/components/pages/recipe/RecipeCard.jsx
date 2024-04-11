import React from 'react';
import {  FaStar, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReactStars from "react-rating-stars-component";



const RecipeCard = ({ recipe , children , onClick , showButton=false, title}) => {
    const navigate=useNavigate();
    const {isAuth}=useSelector(state=>state.role.isAuth)
    const handleClick =()=>{
        navigate(`/recipes/${recipe.id}`)
    }

    const calculateAverageRating = (reviews) => {
      if (!reviews || reviews.length === 0) return 0;
    
      const totalRating = reviews.reduce((acc, review) => acc + parseInt(review.rating), 0);
      return (totalRating / reviews.length).toFixed(1);
    };


  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg " >
      <img className="w-full h-48 rounded-lg rounded-b-none object-cover cursor-pointer  transition-transform transform hover:scale-105" src={recipe.img} alt={recipe.title} onClick={handleClick}/>
      <div className="px-6 py-4">
        <div className="flex justify-between">
          <div className='w-full'>
            <div className='flex justify-between w-full items-center'>
            <div className="font-bold text-xl mb-2" onClick={handleClick}><h1 className='cursor-pointer'>{recipe.title}</h1></div>
            <div className="mr-2 mb-2">
            <ReactStars
                  count={5}
                  value={parseInt(calculateAverageRating(recipe.reviews))}
                  a11y={false}
                  isHalf={true}
                  edit={false}
                  size={15}
                  color={`rgb(156 163 175)`}
                  activeColor={`#ffd700`}
                />
              {/* <FaStar className="inline text-yellow-400"  /> {calculateAverageRating(recipe.reviews)} */}
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
        <div className='w-full'>
        <div className="flex justify-between w-full text-gray-700 text-sm mt-2">
          <span>
            <FaUser className="inline" /> By {recipe.authorName}
          </span>
          {showButton  && (
              <div>
                <button className='p-2 bg-customLightBeige rounded-lg text-black' title={title} onClick={onClick}>{children}</button>
              </div>
            )}
        </div>


        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
