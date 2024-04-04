import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

function Review({ reviews }) {

  return (
    <div>
      <div>
        <h3 className="text-xl font-bold mb-2 mt-2">Reviews</h3>

        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
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
                    <div className="w-7 h-7 text-center rounded-full bg-red-500">
                      {review.userId.toString().substring(0, 1)}{" "}
                      {/*  */}

                    </div>
                    <span>{review.userId}</span>
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

                <div className="flex justify-between">
                  <span>{review.date}</span>{" "}
                  {/* */} 1yr ago
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Review;
