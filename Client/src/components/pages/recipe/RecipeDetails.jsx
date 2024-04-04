import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../common/Loader";
import { IoIosTime } from "react-icons/io";
import { FaHeart, FaUser  } from "react-icons/fa";
import { MdBookmarks } from "react-icons/md";

import Review from "../../common/Review";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../../utils/axios";
import { toast } from "react-toastify";
import { setRole } from "../../../redux/actions/actions";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate= useNavigate();
  const dispatch= useDispatch();

  const isAuth = useSelector((state)=>state.role.isAuth);
  const user = useSelector((state)=>state.role.user);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/recipes/${id}`);
        setRecipe(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recipe:", error);
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3000/reviews?postId=${id}`
        );
        setReviews(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setLoading(false);
      }
    };

    fetchRecipe();
    fetchReviews();
  }, [id]);

  const handleSave = async () =>{
    if(!isAuth) {
      toast.warn('please first login');
      navigate('/login');
    }
    // else {
    //   console.log('you clicked saved button');
    //   user.saved_recipes.push(recipe);
    //   try {
    //     const data = await API.patch(`/users/${user.id}`, user);
    //     dispatch(setRole("user", user));
    //   } catch (error) {
    //     console.log(error);
    //   }
    //   console.log(user);
  
    // }
    else{
      const alreaydLiked = user.saved_recipes.filter(
        (recipes) => recipes.id === recipe.id
      );
  
      if (alreaydLiked.length === 0) {
        user.saved_recipes.push(recipe);
        try {
          const data = await API.patch(`/users/${user.id}`, user);
          dispatch(setRole("user", user));
        } catch (error) {
          console.log(error);
        }
        toast.success("Added to whishlist!", {
          position: "top-right",
        });
      } else {
        toast.success("Already in whishlist!", {
          position: "top-right",
        });
      }
    }
  }

  if (loading) {
    return <Loader />;
  }

  if (!recipe) {
    return <div>Recipe not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className="flex justify-between ">
        <div>
      <h2 className="text-3xl font-bold mb-4 text-customRed">{recipe.title}</h2>
        </div>
        <div className="mb-4 " >
          <button onClick={handleSave} title="Save this recipe">
        <MdBookmarks size={20} />
          </button>
        </div>
      </div>
      <div className="flex justify-between text-gray-600 mb-4">
        <div>
          <p>
            <span className="font-bold">Type:</span> {recipe.type}
          </p>
          <p>
            <span className="font-bold">Cuisine:</span> {recipe.cuisine}
          </p>
          <p>
            <span className="font-bold">Difficulty:</span> {recipe.difficulty}
          </p>

          <div className="flex item-center ">
            <IoIosTime />
            <span className="ml-2">{recipe.cookingTime}</span>
            {/* <p><IoIosTime /><span className="font-bold"></span> {recipe.cookingTime}</p> */}
          </div>

          <p>
            <span className="font-bold">Serving Size:</span>{" "}
            {recipe.servingSize}
          </p>
        </div>
        <div>
          <p>
            <span className="font-bold">
              <FaHeart />
            </span>{" "}
            {recipe.likesCount}
          </p>
          <p>
            <span className="font-bold">
              <FaUser />
            </span>{" "}
            {recipe.authorName}
          </p>
        </div>
      </div>
      <img
        src={recipe.img}
        alt={recipe.title}
        className="w-full rounded-lg mb-4"
      />
      <h3 className="text-xl font-bold mb-2">Ingredients</h3>
      <ul className="list-disc pl-6 mb-4">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h3 className="text-xl font-bold mb-2">Method</h3>
      <p className="mb-4">{recipe.method}</p>
      <h3 className="text-xl font-bold mb-2">Tags</h3>
      <div className="flex flex-wrap">
        {recipe.tags.map((tag, index) => (
          <span
            key={index}
            className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* review section */}
      {/* <Review reviews={reviews} /> */}

    </div>
  );
};

export default RecipeDetails;
