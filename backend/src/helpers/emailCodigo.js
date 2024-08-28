import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config()

export const enviarCodigo = async (email, codigo) => {
    try {
        const config = {
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: true,
            auth:{
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        }

        const transport = nodemailer.createTransport(config)
        const message = {
            from: process.env.EMAIL_USER,
            to: email,
            subject:'Codigo para restablecer contraseña',
            text:codigo
        }

        const info = await transport.sendMail(message)
    } catch (error) {
        return console.log(error)
    }
}