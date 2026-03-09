import api from '../api/api';

export const getProducts = (filters = {}) =>
  api.get('/products', { params: filters });

export const getProductById = (id) =>
  api.get(`/products/${id}`);

export const createProduct = (formData) =>
  api.post('/products', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const updateProduct = (id, formData) =>
  api.put(`/products/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const deleteProduct = (id) =>
  api.delete(`/products/${id}`);
