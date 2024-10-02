import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const generarToken = async (usuario) => {
    try {
        const token = jwt.sign({username: usuario.nombre_usuario}, process.env.SECRET_KEY, {expiresIn: '24h'}) 
        return token
    } catch (error) {
        console.log('Error al generar el token:', error);
    }
}


export const traerClaims = async(token)=>{
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        return decoded
    } catch (error) {
        return null;
    }
} 