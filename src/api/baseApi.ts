import axios from 'axios';

const baseApi = axios.create({
    baseURL: 'http://localhost:8888', // Replace with your backend URL
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,  // Or however you store the token

    },
});

// Add token automatically if present
baseApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default baseApi;
