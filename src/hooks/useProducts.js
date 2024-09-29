import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getResource } from "../utilities/getResource";
import { getToken } from "../utilities/getToken";
import { createResource } from "../utilities/createResource";
import { updateResource } from "../utilities/updateResource";


export function useProducts(productsUrl) {
  const [products, setProducts] = useState([]);
  const [isDisable, setIsDisable] = useState(false);
  const [tags, setTags] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [productImages, setProductImages] = useState([]);
  
  const getProducts = useCallback(async () => {
    const token = getToken();
    try {
      const data = await getResource(productsUrl, token);
      setProducts(data.products);
    } catch (error) {
        console.error("Failed to fetch products: ", error);
        toast.error("Failed to fetch products. Please try again later.");
    }
  }, [productsUrl]);

  useEffect(() => {
    getProducts();
  }, [getProducts])

  const createProduct = useCallback( async (data) => {
    setIsDisable(true);
    const token = getToken();
    try {
      const response = await createResource(
        `${productsUrl}/create`,
        { ...data, tags, thumbnail: thumbnail, previewImages: productImages },
        token,
      )

      if (response.status === 201) {
        toast.success(response.data.message);
        return response.data.product;
      } else {
      toast.error(response.data.message || "Failed to add product");
      }
    } catch (error) {
      toast.error(`An error occurred: ${error.message}`);
    } finally {
      setIsDisable(false);
      setThumbnail(null);
      setProductImages([]);
    }
  }, [productImages, productsUrl, tags, thumbnail])

  const updateProduct = useCallback(async (productId, data) => {
    setIsDisable(true);
    const token = getToken();
    try {
      const response = await updateResource(
        `${productsUrl}/${productId}`,
        {...data, tags, thumbnail: thumbnail, previewImages: productImages },
        token,
      )
      if (response.status === 200) {
        toast.success(response.data.message);
        return response.data.product;
      } else {
        toast.error(response.data.message || "Failed to update product");
      }
    }catch (error) {
        toast.error("An error occurred while updating the product.");
    } finally {
      setIsDisable(false);
      setThumbnail(null);
      setProductImages([]);
    }
  }, [productImages, productsUrl, tags, thumbnail])

  const retrieveProduct = useCallback(async (productId) => {
    const token = getToken();
    try {
      const data = await getResource(`${productsUrl}/${productId}`, token);
      return data.product;
    } catch (error) {
      console.error("Failed to retrieve product: ", error);
      toast.error("Failed to retrieve product. Please try again later.");
    }
  }, [productsUrl])

  const handleAddProduct = useCallback((newProduct) => {
    setProducts((prev) => [...prev, newProduct]);
  }, [])

  const handleUpdateProduct = useCallback((updatedProduct) => {
    setProducts(prev => {
      return prev.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      );
    });
  }, []);

  return {
    products,
    isDisable,
    tags,
    thumbnail,
    productImages,
    setProducts,
    setTags,
    setThumbnail,
    setProductImages,
    getProducts,
    createProduct,
    updateProduct,
    retrieveProduct,
    handleAddProduct,
    handleUpdateProduct,
  }
}
