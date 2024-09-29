import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useProducts } from "../hooks/useProducts";
import ProductPreview from "../molecules/ProductPreview";
import TabsCard from "../molecules/TabsCard";
import ProductCard from "../organisms/ProductCard";
import ProductDetails from "../organisms/ProductDetails";
import ReviewsCard from "../organisms/ReviewsCard";

const PRODUCTS_URL = import.meta.env.VITE_PRODUCT;

const tabs = ["description", "reviews"];

function Product() {
  const [quantity, setQuantity] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [mainImage, setMainImage] = useState("");

  const { 
    cartItems, 
    addToCart, 
    updateQuantity 
  } = useCart();

  const { id } = useParams();

  const { products, retrieveProduct } = useProducts(PRODUCTS_URL);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const loadProduct = useCallback(async () => {
    const product = await retrieveProduct(id);
    if (product) {
      setProduct(product);
      setMainImage(product.previewImages[0]);
    }
  }, [id, retrieveProduct]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  const {
    category,
    description,
    reviews,
  } = product || {};


  useEffect(() => {
    if (products) {
      const filteredProduct = products.filter(
        (product) => product.category === category
      );
      if(filteredProduct && filteredProduct.length > 0) {
        setRelatedProduct(filteredProduct.slice(0, 4));
      }
    }
  }, [category, products]);

  useEffect(() => {
    if (product) {
      const cartProduct = cartItems.find((item) => item._id == id);
      if (cartProduct) {
        setQuantity(cartProduct.quantity);
      } else {
        setQuantity(product.quantity || 1);
      }
    }
  }, [cartItems, id, product]);

  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    const cartProduct = cartItems.find((item) => item._id == id);
    if (cartProduct) {
      updateQuantity(product._id, quantity);
    } else {
      addToCart(product, quantity);
    }
  };

  if (!product) {
    return <div className="flex-center">Loading...</div>;
  }

  return (
    <>
      <div className="bg-transparent py-14">
        <div className="w-[90%] mx-auto flex flex-col md:flex-row gap-12">
          <ProductPreview
            product={product}
            mainImage={mainImage}
            changeMainImage={setMainImage}
          />

          <ProductDetails
            product={product}
            quantity={quantity}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            handleAddToCart={handleAddToCart}
          />
        </div>
      </div>

      <div className="bg-transparent pb-14">
        <div className="w-[90%] mx-auto">
          <TabsCard
            tabs={tabs}
            activeTab={activeTab}
            changeActiveTab={setActiveTab}
          />
          <div>
            {activeTab === 0 && <p className="text-sm mt-8">{description}</p>}
            {activeTab === 1 && <ReviewsCard reviews={reviews} />}
          </div>
        </div>
      </div>

      <ProductCard
        title="Related Products"
        products={relatedProduct}
      />
    </>
  );
}




export default Product;