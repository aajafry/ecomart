import { useCategories } from "../hooks/useCategories";
import { useProducts } from "../hooks/useProducts";
import CategoriesCard from "../organisms/CategoriesCard";
import HeroBanner from "../organisms/HeroBanner";
import HeroFeatures from "../organisms/HeroFeatures";
import ProductCard from "../organisms/ProductCard";
import { useState, useEffect } from "react"

const PRODUCTS_URL = import.meta.env.VITE_PRODUCT;
const CATEGORIES_URL = import.meta.env.VITE_CATEGORY;


function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [featuredCategories, setFeaturedCategories] = useState([]);

  const { products } = useProducts(PRODUCTS_URL);
  const { categories } = useCategories(CATEGORIES_URL);

  useEffect(() => {
    if(products && products.length > 0) {
      setFeaturedProducts(products.slice(0, 8))
    }
  }, [products])

  useEffect(() => {
    if(categories && categories.length > 0) {
      setFeaturedCategories(categories.slice(0, 8))
    }
  }, [categories])

  if (!products || !categories) {
    return <div className="flex-center">Loading...</div>;
  }

  return (
    <>
      <HeroBanner />
      <HeroFeatures />
      <ProductCard title="Featured Products" products={featuredProducts} />
      <CategoriesCard title="Browse More" categories={featuredCategories} />
    </>
  );
}



export default Home