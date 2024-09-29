/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Heading from "../atoms/Heading";

function CategoryCard({ category }) {
  return (
    <div className="relative h-auto bg-gray-100">
      <img
        src={category.thumbnail}
        alt={category.name}
        loading="lazy"
        decoding="async"
        className="w-full h-72 object-cover"
      />
      <div className="absolute top-0 left-0 w-full h-full flex-center flex-col bg-black text-white bg-opacity-50">
        <Heading
          label={
            <Link to={category._id}>
              {category.name}
            </Link>
          }
          weight="font-medium"
          className="capitalize"
        />
        <span>({category.products.length})</span>
      </div>
    </div>
  );
}

export default CategoryCard