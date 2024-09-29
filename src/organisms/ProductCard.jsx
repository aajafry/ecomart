/* eslint-disable react/prop-types */
import Heading from "../atoms/Heading";
import ProductList from "../molecules/ProductList";


function ProductCard({title, products}) {
  return (
    <div className="bg-transparent pb-14">
      <div className="w-[90%] mx-auto">
        <Heading
          label={title}
          size="text-2xl"
          weight="font-normal"
          className="text-center tracking-wide mb-14"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {products.map((product) => (
            <ProductList key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
