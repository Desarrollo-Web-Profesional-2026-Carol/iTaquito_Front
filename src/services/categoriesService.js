import api from '../api/api';

export const getCategories = () => api.get('/categories');
