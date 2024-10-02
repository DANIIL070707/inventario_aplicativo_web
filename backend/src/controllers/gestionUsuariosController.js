
import { pool } from "../database/connection.js";
import bcrypt from "bcryptjs"

export const getUsuarios = async (req, res) => {
  try {
    const client = await pool.connect();
    const queryGetUsuarios = "SELECT * FROM traer_usuarios()";
    const resultGetUsuarios = await client.query(queryGetUsuarios);
    if (resultGetUsuarios.rows.length < 1)
      return res.status(404).json({ message: "Usuario no encontrados" });
    client.release();
    return res.status(200).json(resultGetUsuarios.rows);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

export const getRoles = async (req, res) => {
  try {
    const client = await pool.connect();
    const queryGetRoles = "SELECT * FROM traer_roles()";
    const resultGetRoles = await client.query(queryGetRoles);
    if (resultGetRoles.rows.length < 1)
      return res.status(404).json({ message: "Roles no encontrados" });
    client.release();
    return res.status(200).json(resultGetRoles.rows);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};


export const updateUser = async (req, res) => {
  try {
    const {idEdit} = req.params
    const {nombre_usuarioEdit, nombre_completoEdit, emailEdit,contrasena, rol_idEdit} = req.body


    
    const salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(contrasena, salt);

    if(contrasena.length < 1){
      hash = null
    }
    
  
    const client = await pool.connect()


    const queryEmail = "SELECT * FROM verificar_email_editar($1,$2)";
    const resultEmail = await client.query(queryEmail, [idEdit, emailEdit]);

    if (resultEmail.rows.length >= 1) {
      client.release();
      return res.status(404).json({ message: "Este correo ya está asociado a alguien mas" });
    }

    const queryUsuario = "SELECT * FROM verificar_nombre_usuario_editar($1,$2)";

    const resultUsuario = await client.query(queryUsuario, [idEdit, nombre_usuarioEdit]);

    if (resultUsuario.rows.length >= 1) {
      client.release();
      return res.status(404).json({ message: "Este nombre de usuario ya esta en uso por alguien mas" });
    }


    const queryEdit = 'SELECT actualizar_usuario ($1,$2,$3,$4,$5,$6)'
    const resultEdit = await client.query(queryEdit,[idEdit,nombre_usuarioEdit, hash, nombre_completoEdit, emailEdit ,rol_idEdit  ])
    client.release()

    res.status(201).json({ message: 'Usuario actualizado correctamente' });
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar usuario', error: error });
  }
}


export const deleteUser = async (req, res) => {
  try {

    const {idDelete} = req.params

    const client = await pool.connect()


    const queryDelete = "SELECT eliminar_usuario($1)";
    const resultDelete = await client.query(queryDelete, [idDelete]);

    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar usuario', error: error });
  }
}