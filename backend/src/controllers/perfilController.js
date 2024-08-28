import {__filename, __dirname, pth } from '../app.js';

export const getImage = (req, res) => {
    try {
       
        const imagePath = pth.join(__dirname, '../src/assets/1.png'); // Asegúrate de que la ruta es correcta
        return res.sendFile(imagePath);  // Envía la imagen directamente 
    } catch (error) {
        return res.status(500).json({error: error.message});  
    }


};
