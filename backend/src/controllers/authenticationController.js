import { pool } from "../database/connection.js";
import bcrypt from "bcryptjs";
import { generarToken } from "../config/jwt.js";
import { enviarCodigo } from "../helpers/emailCodigo.js";

export const registroUsuario = async (req, res) => {
  const { nombre_usuario, contrasena, nombre_completo, email, rol_id } =
    req.body;
  
  try {
 
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(contrasena, salt);

    const client = await pool.connect();

   
    const queryEmail = "SELECT * FROM verificar_email_registro($1)";
    const resultEmail = await client.query(queryEmail, [email]);

    if (resultEmail.rows.length >= 1) {
      client.release();
      return res.status(404).json({ message: "Este correo ya está asociado a un usuario" });
    }


    const queryUsuario = "SELECT * FROM verificar_nombre_usuario_registro($1)";
    const resultUsuario = await client.query(queryUsuario, [nombre_usuario]);

    if (resultUsuario.rows.length >= 1) {
      client.release();
      return res.status(404).json({ message: "Este nombre de usuario ya está asociado" });
    }

    const queryRegistrar = 'SELECT registrar_usuario($1, $2, $3, $4, $5)';
    const resultRegistrar = await client.query(queryRegistrar, [nombre_usuario, hash, nombre_completo, email, rol_id]);

 



    client.release();
    res.status(200).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
};


export const login = async  (req, res) => {
    try {
        const {nombre_usuario, contrasena} = req.body
        
      
         const client = await pool.connect()

         const queryTenerUsuario = 'SELECT * FROM tener_usuario_login($1)'
         const resultUsuario = await client.query(queryTenerUsuario, [nombre_usuario])
    
         if(resultUsuario.rows.length < 1){
          client.release()
          return res.status(404).json({message: 'Credenciales incorrectas'});
         } 

         const queryContrasena = 'SELECT * FROM tener_contrasena($1)'
         const resultContrasena = await client.query(queryContrasena, [nombre_usuario])

         const contrasenaActual = resultContrasena.rows[0].contrasena_result

        const comparacionContrasena  = await bcrypt.compare(contrasena, contrasenaActual)

        if(!comparacionContrasena){
        client.release()
        return res.status(404).json({message: 'Credenciales incorrectas'})
        } 
   
        const queryRol = 'SELECT * FROM obtener_rol($1)'
        const resultRol = await client.query(queryRol, [nombre_usuario])
        const id_rol = resultRol.rows[0].rol_id
        const nombre_rol = resultRol.rows[0].nombre

     
       const token = await generarToken(req.body)
       
       res.cookie("Token", token)
       client.release();
      return res.status(200).json({message: 'Credenciales correctas', Token: token, user: [{nombre_usuario: nombre_usuario, rol: nombre_rol, id_rol: id_rol}] })


    } catch (error) {
        console.error('Error al acceder', error);
    }
}


export const generarCodigo = async (req, res) => {
  try {
    const {email} = req.body
    const codigo = Math.floor(100000 + Math.random() * 900000).toString();
  
    const codigoEncriptado = bcrypt.hashSync(codigo,bcrypt.genSaltSync(10))
    const client = await pool.connect()
    const queryVerificarEmail = "SELECT * FROM verificar_email_registro($1)"
    const resultEmail = await client.query(queryVerificarEmail, [email]);
  
    if (resultEmail.rows.length <= 0) {
      client.release();
      return res.status(404).json({ message: "Este correo no esta asociado a ningun usuario" });
    }
    const queryGuardarCodigo = 'select insertar_Codigo($1,$2)'
    const resultInsertarCodigo = await client.query(queryGuardarCodigo, [email, codigoEncriptado])
    client.release()
    enviarCodigo(email, codigo)
    return res.status(201).json({message: "Codigo generado, revise su correo", respuesta: resultInsertarCodigo})

  } catch (error) {
    return res.status(500).json({message: 'Error al enviar codigo', error: error.message})
  }
}


export const verificarCodigo= async (req, res) => {
  try {
    const {email, codigo} = req.body

    const client = await pool.connect()
    const queryVerificarCoddigo = "SELECT * FROM  verificar_codigo($1)"
    const resultCodigo = await client.query(queryVerificarCoddigo,[email])

   const comparacionCodigp = await bcrypt.compare(codigo,resultCodigo.rows[0].codigoencrip )
   client.release()
   if(!comparacionCodigp) return res.status(404).json({message: "Codigo no valido"})

    return res.status(200).json({message:'Codigo valido'})

  } catch (error) {
    return res.status(500).json({erro: error.message})
  }
}


export const cambioContrasena = async (req, res) => {
  try {
    const {contrasena1, contrasena2, email} = req.body

    if(contrasena1 !== contrasena2) return res.status(404).json({message: 'Las contrasenas no coinciden'})

    const contrasenaEncriptada =  bcrypt.hashSync(contrasena1, bcrypt.genSaltSync(10))

    const client = await pool.connect()

    const verificarExistenciaCodigoQuery = "SELECT * FROM  verificar_codigo($1)" 

    const verificarExistenciaCodigoResult = await client.query(verificarExistenciaCodigoQuery, [email])
    
    if(verificarExistenciaCodigoResult.rows.length<=0) return res.status(404).json({message:"Error al restablecer contrasena"})

    
    const cambioContrasenaQuery = "SELECT cambiarContrasena($1,$2)"

    const resultCambioContrasena = await client.query(cambioContrasenaQuery, [contrasenaEncriptada,email])
    client.release()
    return res.status(201).json({message: "Contrasena restablecida", respuesta: resultCambioContrasena })


  } catch (error) {
    return res.status(500).json({error:error.message})
  }
}