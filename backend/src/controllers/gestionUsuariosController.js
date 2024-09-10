import { pool } from "../database/connection.js";

export const getUsuarios = async (req,res) => {
    try {
        
    const client = await pool.connect()
        const queryGetUsuarios = "SELECT * FROM traer_usuarios()"
        const resultGetUsuarios = await client.query(queryGetUsuarios)
       return  res.status(200).json(resultGetUsuarios.rows);
    } catch (error) {
        console.log(error.message)
    }
}