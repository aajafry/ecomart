import axios from "axios";

export const getResource = async (url, token) => {
    try {
        const config = {
            headers: {}
        };

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        const response = await axios.get(url, config);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error(error.response?.data?.message || "An unexpected error occurred.");
    }
}
