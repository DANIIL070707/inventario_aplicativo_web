import { pool } from "../database/connection.js";

export const getUsuarios = async (req,res) => {
    try {
        
    const client = await pool.connect()
        const queryGetUsuarios = "SELECT * FROM traer_usuarios()"
        const resultGetUsuarios = await client.query(queryGetUsuarios)
        if(resultGetUsuarios.rows.length < 1) return res.status(404).json({message: 'Usuario no encontrados'})
       return  res.status(200).json(resultGetUsuarios.rows);
    } catch (error) {
        return res.status(500).json({error: error})
    }
}