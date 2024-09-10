import instancia from './axios.js'
 export const getUsuarios = () => instancia.get('/getUsuarios')