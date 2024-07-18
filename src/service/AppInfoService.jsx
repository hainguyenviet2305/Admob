import axios from 'axios';
import api from './ApiService';



const getAllAppInfos = () => {
    return api.get('/appInfos');
};

const createAppInfo = (appId, appName, po, marketing, leaderMarketing, leaderPo) => {
    return api.post('/appInfos', { appId, appName, po, marketing, leaderMarketing, leaderPo });
};

const updateAppInfo = (id, appId, appName, po, marketing, leaderMarketing, leaderPo) => {
    return api.put(`/appInfos/${id}`, { appId, appName, po, marketing, leaderMarketing, leaderPo });
};

const deleteAppInfo = (id) => {
    return api.delete(`/appInfos/${id}`);
};

export { getAllAppInfos, createAppInfo, updateAppInfo, deleteAppInfo };