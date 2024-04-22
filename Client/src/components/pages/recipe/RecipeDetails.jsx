import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../../common/Loader";
import { IoIosTime } from "react-icons/io";
import { FaEdit, FaHeart, FaStar, FaUser } from "react-icons/fa";
import { MdBookmarks } from "react-icons/md";
import Review from "../../common/Review";
import { useDispatch, useSelector } from "react-redux";
import {
  getRecipeById,
  getReviewsOnRecipe,
  updateUser,
} from "../../../utils/axios";
import { toast } from "react-toastify";
import { setRole } from "../../../redux/actions/actions";
import ReactStars from "react-rating-stars-component";
import Heading from "../../common/Heading";
import Recommanded from "../../common/Recommanded";
import branding from "../../../assets/branding.png";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuth = useSelector((state) => state.role.isAuth);
  const user = useSelector((state) => state.role.user);
  const sub_admin = useSelector((state) => state.role.sub_admin);
  const admin = useSelector((state) => state.role.admin);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const res = await getRecipeById(id);
        if (res.success) {
          setRecipe(res.data);
        } else {
          console.error("Error fetching the recipe:", res.error);
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
      try {
        setLoading(true);
        const res = await getReviewsOnRecipe(id);
        if (res.success) {
          setReviews(res.data);
        } else {
          console.error("Error fetching the reviews:", res.error);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
        console.log("reviews", reviews);
      }
    };

    fetchRecipe();
    fetchReviews();
  }, [id]);

  useEffect(() => {
    // Check if the recipe is saved by the user
    if (user && user.saved_recipes) {
      const isRecipeSaved = user.saved_recipes.some(
        (savedRecipe) => savedRecipe.id === id
      );
      setIsSaved(isRecipeSaved);
    }
  }, [user, id]);


  let tag0 = null;
  let tag1 = null;

  if (recipe && recipe.tags) {
    tag0 = recipe.tags[0];
    tag1 = recipe.tags[1];
  }

  let isEditAllowed = false;
  if (
    (recipe && user && recipe.authorId === user.id) ||
    (recipe && sub_admin && recipe.cuisine === sub_admin.assignedCategory)
  ) {
    isEditAllowed = true;
  }

  console.log("is edit allowed: -> " + isEditAllowed);

  const handleSave = async () => {
    if (!isAuth) {
      toast.warn("please first login");
      navigate("/login");
    } else {
      if (!isSaved) {
        // Only add to saved recipes if not already saved
        user.saved_recipes.push(recipe);
        try {
          const res = await updateUser(user.id, user);
          if (res.success) {
            setLoading(false);
            dispatch(setRole("user", user));
            setIsSaved(true); // Update local state to indicate recipe is saved
          } else {
            console.log("error in updating the user from saveRecipe");
          }
        } catch (error) {
          console.log(error);
        }
        toast.success("Added to SavedRecipe!", {
          position: "top-right",
        });
      } else {
        toast.info("Already Saved!", {
          position: "top-right",
        });
      }
    }
  };

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;

    const totalRating = reviews.reduce(
      (acc, review) => acc + parseInt(review.rating),
      0
    );
    return (totalRating / reviews.length).toFixed(1);
  };

  const handleEdit = () => {
    console.log("you clicked edit button");
    navigate(`/update-recipe/${id}`);
  };

  const handleTagClick = (tag) => {
    console.log("handle tag clicked!", tag);
    navigate(`/recipes/tags/${tag}`);
  };

  if (loading) {
    return <Loader />;
  }

  if (!recipe) {
    return <div>Recipe not found.</div>;
  }

  return (
    <>
      <div className="max-w-4xl ml-4 mr-4 lg:mx-auto mt-8">
        <nav className="bg-customLightBeige text-sm rounded-md p-2 mb-4">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <Link to="/recipes" className="text-gray-500 hover:text-gray-700">
                Recipes
              </Link>
              <span className="mx-2">/</span>
            </li>
            <li className="flex items-center">
              <span className="text-customRed">{recipe.title}</span>
            </li>
          </ol>
        </nav>
        <div className="flex justify-between ">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-customRed">
              {recipe.title}
            </h2>
          </div>
          <div className="mb-4 flex">
            <div className="m-2">
              {!sub_admin && !admin ? (
                <button onClick={handleSave} title="Save this recipe">
                  {isSaved ? (
                    <MdBookmarks size={25} color="Pink" />
                  ) : (
                    <MdBookmarks size={25} />
                  )}
                </button>
              ) : null}
            </div>
            <div className="m-2">
              {isEditAllowed ? (
                <button onClick={handleEdit} title="Edit this recipe">
                  <FaEdit size={25} />
                </button>
              ) : null}
            </div>
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

            <div className="flex item-center gap-1 ">
              {/* <IoIosTime className="inline"/> */}
              <span className="font-bold">Cooking Time: </span>{" "}
              {recipe.cookingTime}
            </div>

            <p>
              <span className="font-bold">Serving Size:</span>{" "}
              {recipe.servingSize}
            </p>
          </div>
          <div>
            <div className="flex gap-4">
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
              <span className="font-bold">
                {calculateAverageRating(recipe.reviews)}
              </span>
            </div>
            <p>
              <span className="font-bold">
                <FaUser className="inline" />
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
        <h3 className="text-xl font-bold mb-2">Ingredients:</h3>
        <ul className="list-disc pl-6 mb-4">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <h3 className="text-xl font-bold mb-2">Method:</h3>
        <p className="mb-4 whitespace-pre-line text-justify">{recipe.method}</p>
        <h3 className="text-xl font-bold mb-2">Tags:</h3>
        <div className="flex flex-wrap">
          {recipe.tags.map((tag, index) => (
            <span
              key={index}
              onClick={() => handleTagClick(tag)}
              className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* review section */}
        {!sub_admin && !admin ? (
          <Review reviews={reviews} recipeId={id} />
        ) : null}

        <div className="">
          <Heading text="SEE SIMILAR RECIPES" />
          <div className="flex flex-wrap justify-center gap-4 md:justify-between md:flex-row md:gap-0 mb-8">
            <Recommanded
              text={recipe.cuisine}
              link={`/recipes/?cuisine=${recipe.cuisine}`}
            />
            <Recommanded text={tag0} link={`/recipes/tags/${tag0}`} />
            <Recommanded text={tag1} link={`/recipes/tags/${tag0}`} />
          </div>
        </div>
      </div>

      <div className="text-center">
        <img
          src={branding}
          alt="branding"
          className="mx-auto max-w-full h-auto"
        />
      </div>
    </>
  );
};

export default RecipeDetails;
