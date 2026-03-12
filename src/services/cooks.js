import api from '../api/api';

export const cooksService = {
  getAll: (filters) => api.get('/cocineros', { params: filters }).then(res => res.data),
  create: (data)    => api.post('/cocineros', data).then(res => res.data),
  update: (id, data)=> api.put(`/cocineros/${id}`, data).then(res => res.data),
  
  // Usamos delete para el borrado lógico (desactivar)
  delete: (id)      => api.delete(`/cocineros/${id}`).then(res => res.data),
  
  // Usamos patch para reactivar
  reactivate: (id)  => api.patch(`/cocineros/${id}`).then(res => res.data),
};