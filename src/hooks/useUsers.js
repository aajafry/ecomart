import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { createResource } from "../utilities/createResource";
import { getResource } from "../utilities/getResource";
import { getToken } from "../utilities/getToken";
import { updateResource } from "../utilities/updateResource";


export function useUsers() {
  const [users, setUsers] = useState([]);
  const [isDisable, setIsDisable] = useState(false);

  const getUsers = useCallback(async (getsUrl) => {
    const token = getToken();
    try {
      const data = await getResource(getsUrl, token);
      setUsers(data?.employees || data?.customers);
    } catch (error) {
      console.error("Failed to fetch users: ", error);
      toast.error("Failed to fetch users. Please try again later.");
    }
  }, []);

  const createUser = useCallback(async (postUrl, data) => {
    setIsDisable(true);
    const token = getToken();
    try {
      const response = await createResource(
        `${postUrl}`,
        data,
        token
      );

      if (response.status === 201) {
        toast.success(response.data.message);
        return (response?.data?.employee || response?.data?.customer);
      } else {
        toast.error(response.data.message || "Failed to add user");
      }
    } catch (error) {
      toast.error(`An error occurred: ${error.message}`);
    } finally {
      setIsDisable(false);
    }
  }, [])

  const updateUser = useCallback(async (putUrl, userId, data) => {
    setIsDisable(true);
    const token = getToken();
    try {
      const response = await updateResource(
        `${putUrl}/${userId}`,
        data,
        token
      )
      if (response.status === 200) {
        toast.success(response.data.message);
        return (response?.data?.employee || response?.data?.customer)
      } else {
        toast.error(response.data.message || "Failed to update user");
      }
    } catch (error) {
      toast.error("An error occurred while updating the user.");
    } finally {
      setIsDisable(false);
    }
  }, []);

  const retrieveUser = useCallback(async (getUrl, userId) => {
    const token = getToken();
    try {
      const data = await getResource(`${getUrl}/${userId}`, token);
      return (data?.employee || data?.customer);
      
    } catch (error) {
      console.error("Failed to retrieve user: ", error);
      toast.error("Failed to retrieve user. Please try again later.");
    }
  }, [])
  
  const handleAddUser = useCallback((newUser) => {
    setUsers((prev) => [...prev, newUser]);
  }, []);

  const handleUpdateUser = useCallback((updatedUser) => {
    setUsers((prev) => {
      return prev.map((user) =>
        user._id === updatedUser._id ? updatedUser : user
      );
    });
  }, []);

  return {
    users,
    isDisable,
    setUsers,
    getUsers,
    createUser,
    updateUser,
    retrieveUser,
    handleAddUser,
    handleUpdateUser,
  }
}