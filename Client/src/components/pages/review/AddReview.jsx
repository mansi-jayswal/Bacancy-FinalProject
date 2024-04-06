import React, { useEffect, useState } from 'react';
import Button from '../../common/Button'; 
import { getAllReviews, getRecipeById, placeNewReview } from '../../../utils/axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setRole } from '../../../redux/actions/actions';

function AddReview() {
  const [reviewData, setReviewData] = useState({
    review: '',
    rating: '',
  });
  const [allReviews , setAllReviews] = useState([]);
  const [recipe , setRecipe] = useState([]);
  const user = useSelector(state=>state.role.user);
  const {id}=useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
        getAllReviews()
        .then(res=> setAllReviews(res.data))
        .catch(err=> console.log('error in fetching all reviews', err))

        getRecipeById(id)
        .then(res=> setRecipe(res.data))
        .catch(err=> console.log('err in fetching particular recipe', err));
  },[])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewData({
      ...reviewData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newReview={
        id: allReviews.length !== 0
        ? (parseInt(allReviews[allReviews.length - 1].id) + 1).toString()
        : "1",
        userId: user.id ,
        postId : id ,
        rating : reviewData.rating,
        comment: reviewData.review
    }
    console.log('Review data:', newReview);
    user.reviews.push(newReview);
    // recipe.reviews.push(newReview);
    try {
        const res = await placeNewReview(newReview)
        if(res.success){
            toast.success('Review added Successfully!');
            dispatch(setRole("user", user));
            navigate(`/recipes/${id}`);
        }
        
    } catch (error) {
        console.log('error in adding the revies', error)
        toast.error('there is some error in adding the review, please try again');
    }




  };

  return (
    <div className="max-w-lg mt-8 mb-8 p-6 bg-white rounded-lg shadow-md ml-4 mr-4 lg:mx-auto">
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Add Your Review</h2>
    </div>
    <div>
    <form onSubmit={handleSubmit}>
        {/* Review Textarea */}
        <div className="mb-4">
          <label htmlFor="review" className="block text-gray-700 font-bold mb-2">
            Your Review
          </label>
          <textarea
            id="review"
            name="review"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            value={reviewData.review}
            onChange={handleChange}
            rows={5}
            required
          />
        </div>
        {/* Rating */}
        <div className="mb-4">
          <label htmlFor="rating" className="block text-gray-700 font-bold mb-2">
            Rating (out of 5)
          </label>
          <input
            type="number"
            id="rating"
            name="rating"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            value={reviewData.rating}
            onChange={handleChange}
            min="1"
            max="5"
            required
          />
        </div>
        {/* Submit Button */}
        <div className="text-center">
          <Button type="submit" children="Submit Review" />
        </div>
      </form>
    </div>
  </div>
  );
}

export default AddReview;
