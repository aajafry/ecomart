import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getResource } from "../utilities/getResource";
import { getToken } from "../utilities/getToken";


export function useUser(userUrl) {
  const [user, setUser] = useState({});

  const fetchUser = useCallback(async () => {
    const token = getToken();
    try {
        const data = await getResource(userUrl, token);  
        setUser(data?.employee || data?.customer);
    } catch (error) {
        console.error("Failed to fetch user: ", error);
        toast.error("Failed to fetch user. Please try again later.");
    }
  }, [userUrl]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleUpdateUser = useCallback((updatedUser) => {
    updatedUser && setUser(updatedUser);
  }, []);  
  return {
    user,
    setUser,
    handleUpdateUser,
  }
}
