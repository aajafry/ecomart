/* eslint-disable react/prop-types */
import { FaStar } from "react-icons/fa";

export const renderStars = ( rating ) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <FaStar
        key={i}
        className={i <= rating ? "text-amber-500" : "text-gray-400"}
      />
    );
  }
  return <div className="flex gap-x-1">{stars}</div>;
};
