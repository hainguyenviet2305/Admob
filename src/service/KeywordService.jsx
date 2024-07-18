import axios from 'axios';
import api from './ApiService';



const getAllKeywords = () => {
    return api.get("/keywords");
};

const createKeyword = (title, email, keyword) => {
    return api.post("/keywords", { title, email, keyword });
};

const updateKeyword = (id, title, email, keyword) => {
    return api.put(`/keywords/${id}`, { title, email, keyword });
};

const deleteKeyword = (id) => {
    return api.delete(`/keywords/${id}`);
};

export { getAllKeywords, createKeyword, updateKeyword, deleteKeyword }; 
