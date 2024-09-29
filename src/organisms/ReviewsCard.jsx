/* eslint-disable react/prop-types */
import ReviewList from "../molecules/ReviewList";

function ReviewsCard({ reviews }) {
  return reviews?.length > 0 ? (
    <div className="flex gap-4 flex-col">
      {reviews.map((review) => (
        <ReviewList key={review._id} review={review} />
      ))}
    </div>
  ) : (
    <p className="text-sm text-center mt-8">No reviews found yet!</p>
  );
}

export default ReviewsCard