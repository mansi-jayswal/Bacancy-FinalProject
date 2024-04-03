// import React, { useEffect } from 'react'
// import { getRecipes } from '../../../utils/axios'

// function RecipeListing() {
//   const [recipes, setRecipes]= useState([]);

//   useEffect(()=>{
//       getRecipes()
//       .then(data=> setRecipes(data))
//       .catch(err=> console.log(err))
//   },[])

//     return (
//         <div className='grid grid-cols-1 md:grid-cols-3 '>
//           {
//             recipes.map(

//             )
//           }
//           <div className="mx-auto px-4 py-8 max-w-sm my-2">
//             <div className="bg-white shadow-2xl rounded-lg mb-6 tracking-wide">
//               <div className="md:flex-shrink-0">
//                 <img
//                   src="https://ik.imagekit.io/q5edmtudmz/post1_fOFO9VDzENE.jpg"
//                   alt="mountains"
//                   className="w-full h-48 rounded-lg rounded-b-none"
//                 />
//               </div>
//               <div className="px-4 py-2 mt-2">
//                 <h2 className="font-bold text-xl text-gray-800 tracking-normal">
//                   {recipes.title}
//                 </h2>
//                 <p className="text-sm text-gray-700 px-2 mr-1">
//                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
//                   reiciendis ad architecto at aut placeat quia, minus dolor
//                   praesentium officia maxime deserunt porro amet ab debitis deleniti
//                   modi soluta similique...
//                 </p>
//                 <div className="flex items-center justify-between mt-2 mx-6">
//                   <a href="#" className="text-blue-500 text-xs -ml-3">
//                     Show More
//                   </a>
//                   <a href="#" className="flex text-gray-700">
//                     <svg
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       className="w-6 h-6 text-blue-500"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
//                       />
//                     </svg>
//                     5
//                   </a>
//                 </div>
//                 <div className="author flex items-center -ml-3 my-3">
//                   <div className="user-logo">
//                     <img
//                       className="w-10 h-10 object-cover rounded-full mx-4 shadow"
//                       src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=731&q=80"
//                       alt="avatar"
//                     />
//                   </div>
//                   <h2 className="text-sm tracking-tighter text-gray-900">
//                     <a href="#">By Mohammed Ibrahim</a>{' '}
//                     <span className="text-gray-600">21 SEP 2015.</span>
//                   </h2>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* <div className="mx-auto px-4 py-8 max-w-sm my-2">
//             <div className="bg-white shadow-2xl rounded-lg mb-6 tracking-wide">
//               <div className="md:flex-shrink-0">
//                 <img
//                   src="https://ik.imagekit.io/q5edmtudmz/post1_fOFO9VDzENE.jpg"
//                   alt="mountains"
//                   className="w-full h-48 rounded-lg rounded-b-none"
//                 />
//               </div>
//               <div className="px-4 py-2 mt-2">
//                 <h2 className="font-bold text-xl text-gray-800 tracking-normal">
//                   My Amazing Journey to the Mountains.
//                 </h2>
//                 <p className="text-sm text-gray-700 px-2 mr-1">
//                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
//                   reiciendis ad architecto at aut placeat quia, minus dolor
//                   praesentium officia maxime deserunt porro amet ab debitis deleniti
//                   modi soluta similique...
//                 </p>
//                 <div className="flex items-center justify-between mt-2 mx-6">
//                   <a href="#" className="text-blue-500 text-xs -ml-3">
//                     Show More
//                   </a>
//                   <a href="#" className="flex text-gray-700">
//                     <svg
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       className="w-6 h-6 text-blue-500"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
//                       />
//                     </svg>
//                     5
//                   </a>
//                 </div>
//                 <div className="author flex items-center -ml-3 my-3">
//                   <div className="user-logo">
//                     <img
//                       className="w-10 h-10 object-cover rounded-full mx-4 shadow"
//                       src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=731&q=80"
//                       alt="avatar"
//                     />
//                   </div>
//                   <h2 className="text-sm tracking-tighter text-gray-900">
//                     <a href="#">By Mohammed Ibrahim</a>{' '}
//                     <span className="text-gray-600">21 SEP 2015.</span>
//                   </h2>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="mx-auto px-4 py-8 max-w-sm my-2">
//             <div className="bg-white shadow-2xl rounded-lg mb-6 tracking-wide">
//               <div className="md:flex-shrink-0">
//                 <img
//                   src="https://ik.imagekit.io/q5edmtudmz/post1_fOFO9VDzENE.jpg"
//                   alt="mountains"
//                   className="w-full h-48 rounded-lg rounded-b-none"
//                 />
//               </div>
//               <div className="px-4 py-2 mt-2">
//                 <h2 className="font-bold text-xl text-gray-800 tracking-normal">
//                   My Amazing Journey to the Mountains.
//                 </h2>
//                 <p className="text-sm text-gray-700 px-2 mr-1">
//                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
//                   reiciendis ad architecto at aut placeat quia, minus dolor
//                   praesentium officia maxime deserunt porro amet ab debitis deleniti
//                   modi soluta similique...
//                 </p>
//                 <div className="flex items-center justify-between mt-2 mx-6">
//                   <a href="#" className="text-blue-500 text-xs -ml-3">
//                     Show More
//                   </a>
//                   <a href="#" className="flex text-gray-700">
//                     <svg
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       className="w-6 h-6 text-blue-500"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
//                       />
//                     </svg>
//                     5
//                   </a>
//                 </div>
//                 <div className="author flex items-center -ml-3 my-3">
//                   <div className="user-logo">
//                     <img
//                       className="w-10 h-10 object-cover rounded-full mx-4 shadow"
//                       src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=731&q=80"
//                       alt="avatar"
//                     />
//                   </div>
//                   <h2 className="text-sm tracking-tighter text-gray-900">
//                     <a href="#">By Mohammed Ibrahim</a>{' '}
//                     <span className="text-gray-600">21 SEP 2015.</span>
//                   </h2>
//                 </div>
//               </div>
//             </div>
//           </div> */}
          
//         </div>
//       )
// }

// export default RecipeListing

import React, { useState, useEffect } from 'react';
import { getRecipes } from '../../../utils/axios';
import RecipeCard from './RecipeCard';

function RecipeListing() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getRecipes()
      .then(res => setRecipes(res.data))
      .catch(err => console.log(err));
  }, []);

  console.log(recipes)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-2 w-[90%] mx-auto">
      {recipes.map(recipe => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}

export default RecipeListing;

