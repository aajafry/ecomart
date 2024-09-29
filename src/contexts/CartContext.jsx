/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { createResource } from "../utilities/createResource";

const COUPON_URL = import.meta.env.VITE_COUPON;

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [coupon, setCoupon] = useState(null);
  const [shippingCost, setShippingCost] = useState(0);

  useEffect(() => {
    try {
      const cartItemsFromStorage =
        JSON.parse(localStorage.getItem("cartItems")) || [];
      setCartItems(cartItemsFromStorage);
    } catch (error) {
        console.error("Failed to load cart items from localStorage", error);
    }
  }, []);

  const addToCart = (product, qty) => {
    let newCart = [...cartItems];
    const existingProduct = newCart.find((item) => 
        item._id === product._id
    );

    if (existingProduct) {
      newCart = newCart.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + (qty || 1) }
          : item
      );
    } else {
      const { _id, name, price, offerPrice, basePrice, shop } = product;
      newCart.push({ _id, name, price: price? price : offerPrice? offerPrice : basePrice, shop, quantity: qty || 1 });
    }
    setCartItems(newCart);
    localStorage.setItem("cartItems", JSON.stringify(newCart));
  };

  const removeFromCart = useCallback((productId) => {
    const newCart = cartItems.filter((item) =>
        item._id !== productId
    );
    setCartItems(newCart);
    localStorage.setItem("cartItems", JSON.stringify(newCart));
  }, [cartItems]);

  const clearCart = () => {
    setCartItems([]);
    setCoupon(null);
    setShippingCost(0);
    localStorage.removeItem("cartItems");
  };

  const updateQuantity = useCallback((productId, quantity) => {
    const newQuantity = Math.max(quantity, 1);

    const newCart = cartItems.map((item) =>
      item._id === productId
        ? { ...item, quantity: newQuantity }
        : item
    );
    setCartItems(newCart);
    localStorage.setItem("cartItems", JSON.stringify(newCart));
  }, [cartItems]);

  const applyCoupon = async (couponCode) => { 
    try {
      const response = await createResource(`${COUPON_URL}/validate`, {
        "code": couponCode,
      });
      setCoupon(response.data.coupon);
    } catch (error) {
      console.error("Failed to apply coupon", error);
    }
  };

  const calculateTotals = useCallback(() => {
    // calculate subTotal
    const subTotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    // calculate discount total
    const discountTotal = cartItems.reduce((total, item) => {
      const { 
        name,
        price, 
        quantity, 
      } = item;

      if (!coupon) return total;

      const {
        selectedProduct,
        discountType,
        discount,
      } = coupon;

      
      const isProductMatch = selectedProduct.includes(name);

      if(isProductMatch) {
        let discountAmount;
        switch (discountType) {
          case "fixed":
            discountAmount = discount * quantity;
            break;
          case "percentage":
            discountAmount = (price * quantity * discount) / 100;
            break;
          default:
            discountAmount = 0;
            break;
        }
        return total + discountAmount;
      }
      return total;
    }, 0);

    // Ensure discount does not exceed subtotal
    const effectiveDiscount = Math.min(discountTotal, subTotal);

    // Calculate shipping cost with a guarantee of at least one unit
    const shopSet = new Set(cartItems.map(item => item.shop));
    const shippingCostTotal = Math.min(shippingCost * shopSet.size, shippingCost);

    // calculate final total
    const finalTotal = subTotal - effectiveDiscount + shippingCostTotal;

    return {
      subTotal,
      discount: (effectiveDiscount),
      finalTotal,
    };
  }, [cartItems, coupon, shippingCost]);


  const isInCart = (productId) => {
    return cartItems.some((item) => item._id === productId);
  };


  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity,
    applyCoupon,
    coupon,
    calculateTotals,
    shippingCost,
    setShippingCost,
    isInCart,
  };

  return( 
    <CartContext.Provider value={value}>
        {children}
    </CartContext.Provider>);
};