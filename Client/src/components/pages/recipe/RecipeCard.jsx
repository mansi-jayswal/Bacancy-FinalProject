import React from 'react';
import { FaHeart, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const RecipeCard = ({ recipe , children , onClick}) => {
    const navigate=useNavigate();
    const {isAuth}=useSelector(state=>state.role.isAuth)
    const handleClick =()=>{
        navigate(`/recipes/${recipe.id}`)
    }


  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg " >
      <img className="w-full h-48 rounded-lg rounded-b-none object-cover cursor-pointer" src={recipe.img} alt={recipe.title} onClick={handleClick}/>
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
        <div className='w-full'>
        <div className="flex justify-between w-full text-gray-700 text-sm mt-2">
          <span>
            <FaUser className="inline" /> By {recipe.authorName}
          </span>
          {/* {
            isAuth ? (
              <div>
              <button className='p-2 bg-customLightBeige rounded-lg' title='add to top picks' onClick={onClick}>{children}</button>
            </div>
            ) : null
          } */}
          {/* {children} */}
          <div>
            <button className='p-2 bg-customLightBeige rounded-lg' title='add to top picks' onClick={onClick}>{children}</button>
          </div>
          
        </div>


        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
