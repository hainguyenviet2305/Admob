import axios from 'axios';

// Tạo một instance của axios với cấu hình mặc định
const api = axios.create({
    baseURL: 'http://74.50.84.183:8080/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Thêm interceptor để đính kèm token vào mỗi yêu cầu
api.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;