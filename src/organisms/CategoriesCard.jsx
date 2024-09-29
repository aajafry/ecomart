/* eslint-disable react/prop-types */
import Heading from "../atoms/Heading";
import CategoryList from "../molecules/CategoryList";

function CategoriesCard({ title, categories}) {
  return (
    <div className="bg-transparent pb-14">
      <div className="w-[90%] mx-auto">
        <Heading
          label={title}
          size="text-2xl"
          weight="font-normal"
          className="text-center tracking-wide mb-14"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-2 gap-y-8 sm:gap-y-2">
          {categories.map((category) => (
            <CategoryList key={category._id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoriesCard;
