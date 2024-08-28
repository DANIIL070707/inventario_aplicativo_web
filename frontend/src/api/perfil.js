import instancia from "./axios.js";

export const ImagenPerfilRequest = () => instancia.get('/getImage', { responseType: 'blob' })