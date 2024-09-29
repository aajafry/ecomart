import axios from "axios";

export const createResource = async (url, data, token) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        const response = await axios.post(url, data, config);
        return response;
    } catch (error) {
        console.error(error);
        throw new Error(error.response?.data?.message || "An unexpected error occurred.");
    }
}