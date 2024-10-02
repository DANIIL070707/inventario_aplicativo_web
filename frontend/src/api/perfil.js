import instancia from "./axios.js";

export const ImagenPerfilRequest = (id) => instancia.post('/getImage',id, { responseType: 'blob' })

export const sendImageRequest = (id,data) => instancia.put(`/sendImage/${id}`,data )