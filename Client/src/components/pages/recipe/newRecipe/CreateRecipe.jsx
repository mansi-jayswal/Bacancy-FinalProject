import React, { useEffect, useState } from "react";
import Button from "../../../common/Button";
import {
  getRecipes,
  placeNewRecipe,
  updateUser,
} from "../../../../utils/axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setRole } from "../../../../redux/actions/actions";
import { toast } from "react-toastify";
import {TagsInput} from "react-tag-input-component";


const CreateRecipe = () => {
  const [recipe, setRecipe] = useState({
    title: "",
    ingredients: [],
    method: "",
    type: "",
    cuisine: "",
    tags: [],
    difficulty: "",
    cookingTime: "",
    servingSize: "",
    image: "",
  });

  const user = useSelector((state) => state.role.user);
  const sub_admin = useSelector((state) => state.role.sub_admin);
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getRecipes()
      .then((res) => setRecipes(res.data))
      .catch((err) => console.log("error in fetching all recipes ", err));
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({
      ...recipe,
      [name]: value,
    });
  };

  const handleTagsChange = (newTags, name) => {
    setRecipe({
      ...recipe,
      [name]: newTags,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(recipe);
    toast.success("recipe created successfully!");

    if(user) navigate('/recipes');
    else if(sub_admin) navigate('/subadmin');


    
    createNewRecipe();
  };

  const createNewRecipe = async () => {
    const newRecipe = {
      id:
        recipes.length !== 0
          ? (parseInt(recipes[recipes.length - 1].id) + 1).toString()
          : "1",
      title: recipe.title,
      // ingredients: recipe.ingredients.toString()
      //   .split(",")
      //   .map((ingredient) => ingredient.trim()),
      ingredients:recipe.ingredients,
      method: recipe.method,
      type: recipe.type,
      cuisine: user ? recipe.cuisine : sub_admin.assignedCategory, 
      // tags: recipe.tags.toString().split(",").map((tag) => tag.trim()),
      tags: recipe.tags,
      difficulty: recipe.difficulty,
      cookingTime: recipe.cookingTime,
      servingSize: recipe.servingSize,
      img: recipe.image,
      reviews: [],
      likesCount: 51,
      authorId: user ? user.id : '1111',
      authorName: user ? user.name : 'FlavourRealm',
    };
    console.log(newRecipe);

    if(user){user.created_recipes.push(newRecipe)};

    try 
    {
      if(user){
      const res = await updateUser(user.id, user);
      if (res.success) {
        setLoading(false);
        dispatch(setRole("user", user));
      } else {
        console.log("error in updating the user from createRecipe");
      }
    }
    } 
    catch (error) {
      console.log(error);
    }

    placeNewRecipe(newRecipe)
      .then((res) => console.log("newRecipe created", res.data))
      .catch((err) => console.log("error in creating a new recipe", err));
  };

  return (
    <div className="max-w-lg mx-auto mt-8 mb-8 p-6 bg-white rounded-lg shadow-md">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Create New Recipe</h2>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 font-bold mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              value={recipe.title}
              onChange={handleChange}
              required
            />
          </div>
          {/* Ingredients */}
          <div className="mb-4">
            <label
              htmlFor="ingredients"
              className="block text-gray-700 font-bold mb-2"
            >
              Ingredients (Press Enter to add ingredients)
            </label>
            <TagsInput
              id="ingredients"
              name="ingredients"
              value={recipe.ingredients}
              onChange={(newTags) => handleTagsChange(newTags, "ingredients")}
            />
          </div>
          {/* Method */}
          <div className="mb-4">
            <label
              htmlFor="method"
              className="block text-gray-700 font-bold mb-2"
            >
              Method
            </label>
            <textarea
              id="method"
              name="method"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              value={recipe.method}
              onChange={handleChange}
              rows={5}
              required
            ></textarea>
          </div>
          {/* Type */}
          <div className="mb-4">
            <label
              htmlFor="type"
              className="block text-gray-700 font-bold mb-2"
            >
              Type
            </label>
            <select
              id="type"
              name="type"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              value={recipe.type}
              onChange={handleChange}
              required
            >
              <option value="">Select type</option>
              <option value="veg">Veg</option>
              <option value="non-veg">Non-veg</option>
            </select>
          </div>
          {/* Cuisine */}
          <div className="mb-4">
            <label
              htmlFor="cuisine"
              className="block text-gray-700 font-bold mb-2"
            >
              Cuisine
            </label>
             {user && (
             <select
             id="cuisine"
             name="cuisine"
             className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
             value={recipe.cuisine}
             onChange={handleChange}
             required
           >
             <option value="">Select cuisine</option>
             {Array.from(new Set(recipes.map(recipe => recipe.cuisine))).map((cuisine) => (
               <option key={cuisine} value={cuisine}>
                 {cuisine}
               </option>
             ))}
           </select>
            )}
            {sub_admin && (
              <input
                type="text"
                id="cuisine"
                name="cuisine"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                value={sub_admin.assignedCategory}
                disabled
              /> )}
          </div>
          {/* Tags */}
          <div className="mb-4">
            <label
              htmlFor="tags"
              className="block text-gray-700 font-bold mb-2"
            >
              Tags (Enter to add new Tags)
            </label>
            <TagsInput
              id="tags"
              name="tags"
              value={recipe.tags}
              onChange={(newTags) => handleTagsChange(newTags, "tags")}
            />
          </div>
          {/* Difficulty */}
          <div className="mb-4">
            <label
              htmlFor="difficulty"
              className="block text-gray-700 font-bold mb-2"
            >
              Difficulty
            </label>
            <select
              id="difficulty"
              name="difficulty"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              value={recipe.difficulty}
              onChange={handleChange}
              required
            >
              <option value="">Select difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            {/* <input type="text" id="difficulty" name="difficulty" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" value={recipe.difficulty} onChange={handleChange} /> */}
          </div>
          {/* Cooking Time */}
          <div className="mb-4">
            <label
              htmlFor="cookingTime"
              className="block text-gray-700 font-bold mb-2"
            >
              Cooking Time (in minutes )
            </label>
            <input
              type="text"
              id="cookingTime"
              name="cookingTime"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              value={recipe.cookingTime}
              onChange={handleChange}
              required
            />
          </div>
          {/* Serving Size */}
          <div className="mb-4">
            <label
              htmlFor="servingSize"
              className="block text-gray-700 font-bold mb-2"
            >
              Serving Size
            </label>
            <input
              type="text"
              id="servingSize"
              name="servingSize"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              value={recipe.servingSize}
              onChange={handleChange}
              required
            />
          </div>
          {/* Image */}
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-gray-700 font-bold mb-2"
            >
              Image URL
            </label>
            <input
              type="text"
              id="image"
              name="image"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              value={recipe.image}
              onChange={handleChange}
              required
            />
          </div>
          {/* Submit Button */}
          <div className="text-center">
            {/* <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Create Recipe</button> */}
            <Button type="submit" children="Submit Recipe" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRecipe;
