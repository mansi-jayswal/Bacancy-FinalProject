import React, { useEffect, useState } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getUserById } from "../../utils/axios";
import { useNavigate } from "react-router-dom";

function Review({ reviews , recipeId }) {

  console.log('id from review component prop',recipeId)
  const isAuth = useSelector(state => state.role.isAuth);
  const [users , setUsers]= useState({});
  const navigate= useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = {};
        for (const review of reviews) {
          if (!usersData[review.userId]) {
            const userResponse = await getUserById(review.userId);
            if (userResponse.success) {
              const user = userResponse.data; 
              usersData[review.userId] = user.name; 
            } else {
              console.error('Error fetching user:', userResponse.error);
            }
          }
        }
        setUsers(usersData);
        console.log(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [reviews]);


  const handleReview = () =>{

    if(!isAuth){
      toast.warn('please login to add the review!');
    }
    else {
      console.log('you can give the review');
      navigate(`/add-review/${recipeId}`);
    }

  }

  return (
    <div>
      <div>
        <div className="flex justify-between">
          <div>
        <h3 className="text-xl font-bold mb-2 mt-2">Reviews</h3>
          </div>
          <div>
        <button className="text-xl font-bold mb-2 mt-2" onClick={handleReview}> + Add your Review..</button>
          </div>
        </div>

        {reviews.length === 0 ? (
          <p className="mb-4">No reviews yet.</p>
        ) : (
          <div className="flex flex-col gap-3 mt-4 mb-4 text-white">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="flex flex-col gap-4 bg-customRed p-4"
              >
                {/* Profile and Rating */}
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <div className="w-7 h-7 text-center items-center rounded-full bg-red-400">
                    {users[review.userId]?.substring(0, 1).toUpperCase()} 
                    </div>
                    {/* <span>{review.userId}</span> */}
                    <span>{users[review.userId]}</span>
                  </div>
                  <div className="flex p-1 gap-1 text-orange-300">

                    {/* */}
                    {Array.from({ length: review.rating }, (_, index) => (
                      <FaStar key={index} />
                    ))}
                    {review.rating % 1 !== 0 && <FaStarHalfAlt />}
                    
                  </div>
                </div>

                <div>{review.comment}</div>

                {/* <div className="flex justify-between">
                  <span>{review.date}</span>{" "}
                  1yr ago
                </div> */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Review;
