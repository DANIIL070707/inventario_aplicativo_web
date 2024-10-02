import instancia from './axios.js'
 export const getUsuarios = () => instancia.get('/getUsuarios')
 export const getRoles =() => instancia.get('/getRoles')
 export const register = (data) => instancia.post('/register', data)
 export const  updateUser = (id, data) => instancia.put(`/updateUser/${id}`, data)
 export const  deleteUser = (id) => instancia.delete(`/deleteUser/${id}`)