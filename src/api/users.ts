import axios from 'axios';

const API_URL = 'http://localhost:8888/users/';

export const getAllUsers = async (token: string) => {
    const response = await axios.get(`${API_URL}all`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};
