import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createResource } from "../utilities/createResource";
import { getResource } from "../utilities/getResource";
import { getToken } from "../utilities/getToken";
import { updateResource } from "../utilities/updateResource";

export function useCategories(url) {
  const [categories, setCategories] = useState([]);
  const [categoriesName, setCategoriesName] = useState([]);
  const [isDisable, setIsDisable] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);

  const getCategories = useCallback(async () => {
    const token = getToken();
    try {
      const data = await getResource(url, token);
      setCategories(data.categories);
    } catch (error) {
      console.error("Failed to fetch categories: ", error);
      toast.error("Failed to fetch categories. Please try again later.");
    }
  }, [url]);

  useEffect(() => {
    getCategories ();
  }, [getCategories]);

  useEffect(() => {
    setCategoriesName(Array.from(new Set(categories?.map((category) => category.name))));
  }, [categories])

  const createCategory = useCallback(async (data) => {
    setIsDisable(true);
    const token = getToken();
    try {
      const response = await createResource(
        `${url}/create`,
        { ...data, thumbnail: thumbnail },
        token
      );
      if (response.status === 201) {
        toast.success(response.data.message);
        return response.data.category;
      } else {
        toast.error(response.data.message || "Failed to add category");
      }
    } catch (error) {
       toast.error(`An error occurred: ${error.message}`);
    } finally{
      setIsDisable(false);
      setThumbnail(null);
    }
  }, [thumbnail, url]);

  const updateCategory = useCallback(async (categoryId, data) => {
    setIsDisable(true);
    const token = getToken();
    try {
      const response = await updateResource(
        `${url}/${categoryId}`,
         { ...data, thumbnail },
        token
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        return response.data.category;
      } else {
        toast.error(response.data.message || "Failed to update category");
      }
    } catch (error) {
       toast.error("An error occurred while updating the category.");
    } finally {
      setIsDisable(false);
      setThumbnail(null);
    }
  }, [thumbnail, url]) 

  const retrieveCategory = useCallback(async (categoryId) => {
    const token = getToken();
    try {
      const data = await getResource(`${url}/${categoryId}`, token);
      return data.category;
    } catch (error) {
      console.error("Failed to retrieve category: ", error);
      toast.error("Failed to retrieve category. Please try again later.");
    }
  }, [url]);

  const handleAddCategory = useCallback((newCategory) => {
    setCategories((prev) => [...prev, newCategory]);
  }, []);

  const handleUpdateCategory = useCallback((updatedCategory) => {
    setCategories((prev) => { 
      return prev.map((category) =>
        category._id === updatedCategory._id ? updatedCategory : category
      )
    });
  }, []);

  return {
    categories,
    categoriesName,
    isDisable,
    thumbnail,
    setCategories,
    setIsDisable,
    setThumbnail,
    createCategory,
    getCategories,
    updateCategory,
    retrieveCategory,
    handleAddCategory,
    handleUpdateCategory,
  };
}
