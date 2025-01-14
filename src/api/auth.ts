import axios from 'axios';

const API_URL = 'http://localhost:8888/auth/';

export const registerUser = async (userData: { email: string; password: string; name: string }) => {
    const response = await axios.post(`${API_URL}register`, userData);
    return response.data;
};

export const loginUser = async (userData: { email: string; password: string }) => {
    try {
        const response = await fetch(`${API_URL}login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();
        console.log('API Login Response:', data); // Log the API response

        if (!data.user || !data.access_token) {
            throw new Error('Invalid API response: Missing user or token');
        }
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error; // Ensure errors propagate
    }
};

