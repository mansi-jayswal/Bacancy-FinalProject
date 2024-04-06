import React, { useEffect, useState } from "react";
import Button from "../../../common/Button";
import { API, getRecipes, updateRecipe } from "../../../../utils/axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setRole } from "../../../../redux/actions/actions";
import { toast } from "react-toastify";

const UpdateRecipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({
    title: "",
    ingredients: "",
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

  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getRecipes()
      .then((res) => {
        setRecipes(res.data);
        // Find the recipe with the provided id
        const existingRecipe = res.data.find((recipe) => recipe.id === id);
        if (existingRecipe) {
          setRecipe(existingRecipe);
        } else {
          // Handle case when recipe with provided id is not found
          console.log("Recipe not found");
        }
      })
      .catch((err) => console.log("error in fetching all recipes ", err));
  }, [id]);

  const handleChange = (e) => {
    setRecipe((prevValue) => {
      return {
        ...prevValue,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(recipe);

    const newRecipe={
      // id:recipe.id, 
      title: recipe.title ,
      ingredients: recipe.ingredients.split(',').map(ingredient => ingredient.trim()).filter(Boolean),
      method : recipe.method ,
      type: recipe.type ,
      cuisine : recipe.cuisine ,
      tags: recipe.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      difficulty : recipe.difficulty ,
      cookingTime: recipe.cookingTime , 
      servingSize : recipe.servingSize ,
      img: recipe.image ,
      reviews:[] ,
      likesCount: 51 ,
      authorId: user.id ,
      authorName: user.name
  }
    try {
      console.log(newRecipe);
      await updateRecipe(id, newRecipe);
      toast.success("Recipe updated successfully!");

      // Find the index of the updated recipe in the user's created_recipes array
      const index = user.created_recipes.findIndex((r) => r.id === id);

      // If the recipe is found, update it with the new recipe data
      if (index !== -1) {
        const updatedUser = { ...user };
        updatedUser.created_recipes[index] = { ...newRecipe, id };

        // Make an API call to update the user schema with the modified created_recipes field
        await API.patch(`/users/${user.id}`, updatedUser);

        // Update the user in Redux state
        dispatch(setRole("user", updatedUser));
      }

      // Navigate to the my-creations page
      navigate("/my-creations");
    } catch (error) {
      console.log("Error updating recipe: ", error);
      toast.error("Failed to update recipe. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 mb-8 p-6 bg-white rounded-lg shadow-md">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Update Recipe</h2>
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
            />
          </div>
          {/* Ingredients */}
          <div className="mb-4">
            <label
              htmlFor="ingredients"
              className="block text-gray-700 font-bold mb-2"
            >
              Ingredients
            </label>
            <textarea
              id="ingredients"
              name="ingredients"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              value={recipe.ingredients}
              onChange={handleChange}
            ></textarea>
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
            >
              <option value="">Select type</option>
              <option value="veg">Veg</option>
              <option value="non-veg">Non-veg</option>
            </select>
            {/* <input type="text" id="type" name="type" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" value={recipe.type} onChange={handleChange} /> */}
          </div>
          {/* Cuisine */}
          <div className="mb-4">
            <label
              htmlFor="cuisine"
              className="block text-gray-700 font-bold mb-2"
            >
              Cuisine
            </label>
            <input
              type="text"
              id="cuisine"
              name="cuisine"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              value={recipe.cuisine}
              onChange={handleChange}
            />
          </div>
          {/* Tags */}
          <div className="mb-4">
            <label
              htmlFor="tags"
              className="block text-gray-700 font-bold mb-2"
            >
              Tags
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              value={recipe.tags}
              onChange={handleChange}
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
              Cooking Time (in mins / hour, eg - 10 mins, 1 hour 15 mins)
            </label>
            <input
              type="text"
              id="cookingTime"
              name="cookingTime"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              value={recipe.cookingTime}
              onChange={handleChange}
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
            />
          </div>
          {/* Submit Button */}
          <div className="text-center">
            {/* <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Create Recipe</button> */}
            <Button type="submit" children="Update Recipe" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateRecipe;
