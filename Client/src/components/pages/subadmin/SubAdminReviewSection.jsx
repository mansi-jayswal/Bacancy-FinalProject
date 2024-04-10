import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { deleteReview, getRecipes, updateRecipe } from "../../../utils/axios";
import { FaStar } from "react-icons/fa";
import Button from "../../common/Button";
import { toast } from "react-toastify";

function SubAdminReviewSection() {
  const [reviews, setReviews] = useState([]);
  const subAdmin = useSelector((state) => state.role.sub_admin);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    if (subAdmin && subAdmin.assignedCategory) {
      getRecipes()
        .then((res) => {
          // Filtering recipes based on sub_admin's assignedCategory
          const filteredRecipes = res.data.filter(
            (recipe) => recipe.cuisine === subAdmin.assignedCategory
          );
          setFilteredRecipes(filteredRecipes);
        })
        .catch((err) => console.error("Error fetching recipes:", err));
    }
  }, [subAdmin]);

  useEffect(() => {
    const allReviews = [];
    filteredRecipes.forEach((recipe) => {
      recipe.reviews.forEach((review) => {
        allReviews.push({
          recipeTitle: recipe.title,
          review: review,
        });
      });
    });
    setReviews(allReviews);
  }, [filteredRecipes]);

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview(reviewId);

      setReviews(reviews.filter((review) => review.review.id !== reviewId));

      const updatedRecipes = filteredRecipes.map((recipe) => {
        const updatedReviews = recipe.reviews.filter(
          (review) => review.id !== reviewId
        );

        return {
          ...recipe,
          reviews: updatedReviews,
        };
      });
      setFilteredRecipes(updatedRecipes);

      updatedRecipes.forEach(async (recipe) => {
        try {
          await updateRecipe(recipe.id, recipe);
        } catch (error) {
          console.log("Error updating recipe:", error);
        }
      });
      toast.success("Review deleted successfully!");
    } catch (error) {
      console.log("Error deleting the review:", error);
      toast.error("Error deleting the review!");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center text-customRed">
        <h2 className="text-2xl font-bold mb-4">Sub-Admin Review Section</h2>
      </div>
      {
        reviews.length==0 ?
         <div className="text-center">
          <h1 className="text-xl font-semibold text-customRed">No reviews found!</h1>
         </div>
         :
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.map((review, index) => (
          <div key={index} className="bg-white p-4 rounded-md shadow-md">
            <p className="text-customDarkRed font-semibold">
              Recipe Title: {review.recipeTitle}
            </p>
            <div className="flex p-1 gap-1 text-orange-400">
              {Array.from({ length: review.review.rating }, (_, index) => (
                <FaStar key={index} />
              ))}
              {review.review.rating % 1 !== 0 && <FaStarHalfAlt />}
            </div>
            <p className="text-customRed mb-2">
              Comment: {review.review.comment}
            </p>
            <p className="text-gray-500">User ID: {review.review.userId}</p>
            <p className="text-gray-500">Post ID: {review.review.postId}</p>
            {/* <button className='bg-customRed text-white mt-2 p-2 rounded-md'>Delete Review</button> */}
            <Button
              children="Delete Review"
              buttonStyle="ml-0 [!important]"
              handleClick={() => handleDeleteReview(review.review.id)}
            />
          </div>
        ))}
      </div>
      }
    </div>
  );
}

export default SubAdminReviewSection;