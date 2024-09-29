/* eslint-disable react/prop-types */
import { renderStars } from "../utilities/renderStars";


function ReviewList({ review }) {
  return (
    <div className="p-4 flex gap-4 bg-slate-100">
      <img
        src={review.user.avatar}
        alt={review.user.name}
        className="w-12 h-12 object-cover rounded-full"
      />
      <div className="flex-1 text-sm">
        <p className="text-base text-amber-500 font-medium capitalize">
          {review.user.name}
        </p>
        {renderStars(review.rating)}
        <p>{review.createdAt}</p>

        <p className="text-pretty">{review.comment}</p>
      </div>
    </div>
  );
}

export default ReviewList