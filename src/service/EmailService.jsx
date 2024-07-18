import axios from 'axios';
import api from './ApiService';



const getAllEmails = () => {
    return api.get('/emails');
};

const createEmail = (emailAccount, emailForward) => {
    return api.post('/emails', { emailAccount, emailForward });
};

const updateEmail = (id, emailAccount, emailForward) => {
    return api.put(`/emails/${id}`, { emailAccount, emailForward });
};

const deleteEmail = (id) => {
    return api.delete(`/emails/${id}`);
};

export { getAllEmails, createEmail, updateEmail, deleteEmail };