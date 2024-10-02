import {__filename, __dirname ,pth} from '../app.js';
import multer from 'multer'
import { pool } from '../database/connection.js';
export const getImage = async (req, res) => {
    try {
       
        const {id} = req.body;

        const client = await pool.connect()

        const queryImage = 'SELECT * FROM obtener_url_image($1)'
        const resultImage = await client.query(queryImage, [id])
        client.release()
       
        if(resultImage.rows[0].url_images == 'default_image') {
        const imagePathDefault = pth.join(__dirname, '../src/assets/default.png')
        return res.sendFile(imagePathDefault)
        }else{
        const imagePath = pth.join(__dirname, `../src/assets/${id}.png`)
        return res.sendFile(imagePath)
        }
        
    } catch (error) {
        return res.status(500).json({error: error.message});  
    }
};

const storage = multer.diskStorage({
 
destination: (req,file,cb)=>{
    cb(null, pth.join(__dirname, '../src/assets')); 
},

filename: (req,file,cb)=>{
    const userId = req.params.id; 
    if (!userId) {
        return cb(new Error('userId is undefined'));
    }
    const extension = pth.extname(file.originalname);
    cb(null, `${userId}${extension}`)
}

})

export const upload = multer({storage})

export const sendImage = async(req, res) => {
    try {
        const userId = req.params.id; 
        const extension = pth.extname(req.file.originalname);
        // Construir la ruta completa donde se guardó la imagen
       
        const filePath = pth.join(__dirname, '../src/assets', `${userId}${extension}`);
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }
      
        const client = await pool.connect()
        const queryImage =  'SELECT insertar_url_image($1, $2)'
        const resultImage = await client.query(queryImage, [filePath, userId])
        if(resultImage.rows.length < 1) return   res.status(404).json({message: 'La imagen no se pudo actualizar'});
        res.status(201).json({message: 'Image actualizada con exito'});
    } catch (error) {
        return res.status(500).json({error: error.message});  
    }
}
