import axios from 'axios';
import api from './ApiService';

const AUTH_API_URL = 'http://74.50.84.183:8080/api/auth/login';
const getAllUsers = () => {
    return api.get('/users');
};

const createUser = (email, password) => {
    return api.post('/users', { email, password });
};

const updateUser = (id, email, role, password) => {
    return api.put(`/users/${id}`, { email, role, password });
};

const deleteUser = (id) => {
    return api.delete(`/users/${id}`);
};

const loginUser = (email, password) => {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    // Sử dụng axios gốc cho yêu cầu đăng nhập vì nó không cần token
    return axios.post(AUTH_API_URL, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};
export { getAllUsers, createUser, updateUser, deleteUser, loginUser };