/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const WishlistContext = createContext();

export const useWishlist = () => {
  return useContext(WishlistContext);
};

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const wishlistItemsFromStorage =
      JSON.parse(localStorage.getItem("wishlistItems")) || [];
      setWishlistItems(wishlistItemsFromStorage);
  }, []);

  const addToWishlist = (product) => {
    let newWishlist = [...wishlistItems];
    const existingWishlist = newWishlist.find((item) => 
        item._id === product._id
    );

    if (!existingWishlist) {
      const { _id, name, offerPrice, basePrice } = product;
      newWishlist.push({
        _id,
        name,
        price: offerPrice ? offerPrice : basePrice,
      });
    }

    setWishlistItems(newWishlist);
    localStorage.setItem("wishlistItems", JSON.stringify(newWishlist));
  };

  const removeFromWishlist = useCallback((productId) => {
    const newWishlist = wishlistItems.filter((item) => 
        item._id !== productId
    );
    setWishlistItems(newWishlist);
    localStorage.setItem("wishlistItems", JSON.stringify(newWishlist));
  }, [wishlistItems]);

  const clearWishlist = () => {
    setWishlistItems([]);
    localStorage.removeItem("wishlistItems");
  };

  
  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item._id === productId);
  };


  const value = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};
