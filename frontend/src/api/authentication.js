import instancia from "./axios.js";

export const LoginRequest = (usuario) => instancia.post('/login', usuario)
export const emailCodigo = (email) => instancia.post('/generarCodigo',email)
export const verificarCodigo = (data) => instancia.post('/verificarCodigo',data)
export const restablecerPass = (data) => instancia.post('/cambioContrasena',data)
export const datosUsuario = (data) => instancia.post('/traerDatosUsuarios', data)
