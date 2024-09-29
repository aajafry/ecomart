import axios from "axios";

export const deleteResource = async (url, token) => {
    try {
        const config = {
            headers: {}
        };

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        const response = await axios.delete(url, config);
        return response;
    } catch (error) {
        console.error(error);
        throw new Error(error.response?.data?.message || "An unexpected error occurred.");
    }

}
