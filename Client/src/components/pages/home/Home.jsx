// import React, { useEffect, useState } from 'react';
// import banner from '../../../assets/banner.png';
// import Section from '../../common/Section';
// import Heading from '../../common/Heading';
// import { getRecipes } from '../../../utils/axios';
// import RecipeCard from '../recipe/RecipeCard';
// import {  useNavigate } from 'react-router-dom';
// import Button from '../../common/constants/Button';
// import { useSelector } from 'react-redux';

// function Home() {
//   const [recipes, setRecipes] = useState([]);
//   const user = useSelector((state)=> state.role.user);

//   console.log(user.preferred_cuisine)

//   const navigate=useNavigate();
//   useEffect(() => {
//     getRecipes()
//       .then(res => setRecipes(res.data))
//       .catch(err => console.log(err));
//   }, []);

//   const handleClick=()=>{
//     navigate('/recipes')
//   }


//   const filteredRecipes = recipes.filter(recipe => recipe.cuisine.toLowerCase() === user.preferred_cuisine);
//   // const filteredRecipes = recipes.filter(recipe => recipe.cuisine.toLowerCase() === 'indian');

//   console.log(filteredRecipes)

//   return (
//     <div className="relative">
//       <img src={banner} alt="banner" className="w-full h-auto mr-4 " />
      
//       {/* category round images */}
//       <Section /> 
//       {/* recommended for you */}
//       <Heading text="Recommended for you" />  
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-2 w-[90%] mx-auto">
        
//         { 
//         filteredRecipes.map(recipe => (
//           <RecipeCard key={recipe.id} recipe={recipe} />
//         ))}
//       </div>

//        <div className='flex justify-center m-2 '>
//         <Button handleClick={handleClick} children="Browse all recipes"/>
//       </div>
//     </div>
//   );
// }

// export default Home;


import React, { useEffect, useState } from 'react';
import banner from '../../../assets/banner.png';
import Section from '../../common/Section';
import Heading from '../../common/Heading';
import { getRecipes } from '../../../utils/axios';
import RecipeCard from '../recipe/RecipeCard';
import { useSelector } from 'react-redux';
// import Button from '../../common/Button';
import { useNavigate } from 'react-router-dom';
import Button from '../../common/Button';

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const user = useSelector((state) => state.role.user);
  const navigate = useNavigate();

  useEffect(() => {
    getRecipes()
      .then((res) => {
        setRecipes(res.data);
        filterRecipes(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    filterRecipes(recipes);
  }, [recipes, user]);

  const filterRecipes = (recipes) => {
    if (user && user.preferred_cuisine) {
      const filtered = recipes.filter(
        (recipe) => recipe.cuisine.toLowerCase() === user.preferred_cuisine.toLowerCase()
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
      {/* <Section /> */}
      {/* recommended for you */}
      <Heading text="Recommended for you" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-2 w-[90%] mx-auto">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)
        ) : (
          <p>Please login to see recomanded recipes for you!</p>
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
