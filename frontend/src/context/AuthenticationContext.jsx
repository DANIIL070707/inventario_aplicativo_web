import React, { createContext, useContext, useEffect, useState } from "react";
import { LoginRequest, emailCodigo, verificarCodigo, restablecerPass,
  datosUsuario
} from "../api/authentication.js";
import { ImagenPerfilRequest, sendImageRequest } from "../api/perfil.js";
import Cookies from 'js-cookie'


export const AuthenticationContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthenticationContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthenticationProvider");
  }

  return context;
};

export const AuthenticationProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorRequest, setErrorRequest] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [successfullyRequest, setSuccessfullyRequest] = useState(false);
  const [messageSuccessfully, setMessageSuccessfully] = useState("");
  const [nombre_usuario, setNombre_usuario] = useState("")
  const [rol, setRol] = useState("")
  const [id, setId] = useState("")

  const [image, setImage] = useState(null)
  const [paso1, setPaso1] = useState(true)
  const [paso2, setPaso2] = useState(false)
  const [paso3, setPaso3] = useState(false)
  const [proceso, setProceso] = useState(false)

  const Login = async (usuario) => {
    try {
      const res = await LoginRequest(usuario);

      setIsAuthenticated(true);
      setSuccessfullyRequest(true)
      setMessageSuccessfully(res.data.message);
      setNombre_usuario(res.data.user[0].nombre_usuario)
      setRol(res.data.user[0].rol)
      
      const cookie = Cookies.get()

//para traer datos usuarios logueado
    const send = {token:cookie.Token}
      datosDelUsuario(send)

      setTimeout(() => {
        setSuccessfullyRequest(false);
      }, 1000);
   
    } catch (error) {
      setMessageError(error.response.data.message);
   
      setErrorRequest(true)
      setMessageSuccessfully(false);
      setIsAuthenticated(false)
      setTimeout(() => {
        setErrorRequest(false);
      }, 1000);
    }
  };
  
  const enviarEmailCodigo = async (email)=>{
    try {
     
      const res = await emailCodigo(email)
     
      setSuccessfullyRequest(true)
      setPaso1(false)
      setPaso2(true)
      setMessageSuccessfully(res.data.message)

      setTimeout(()=>{
      setSuccessfullyRequest(false)
  
      },1000)
    
    } catch (error) {
      console.log(error)
      setErrorRequest(true)
      setMessageError(error.response.data.message)
      setMessageSuccessfully(false)
      setTimeout(() => {
        setErrorRequest(false);
      }, 1000);
    }
  }

  const sendVerificarCodigo = async (data) =>{
    try {
      const res = await verificarCodigo(data)
      setSuccessfullyRequest(true)
      setPaso1(false)
      setPaso2(false)
      setPaso3(true)
      setMessageSuccessfully(res.data.message)

      setTimeout(()=>{
      setSuccessfullyRequest(false)
      },1000)
    
    } catch (error) {
      setErrorRequest(true)
      setMessageError(error.response.data.message)
      setMessageSuccessfully(false)
      setTimeout(() => {
        setErrorRequest(false);
      }, 1000);
    }
  }


  const sendContrasena = async (data) =>{
    try {
      const res = await restablecerPass(data)
      setSuccessfullyRequest(true)

  
      setMessageSuccessfully(res.data.message)
      setProceso(true)
      setTimeout(()=>{
      setSuccessfullyRequest(false)
      setProceso(false)
          
      },1000)
  setProceso(true)

    } catch (error) {
      setErrorRequest(true)
      setMessageError(error.response.data.message)
      setMessageSuccessfully(false)
      setTimeout(() => {
        setErrorRequest(false);
      }, 1000);
    }
  }

  const imagenPerfil = async (id) => {
    try {
      const res = await ImagenPerfilRequest(id);
      
    
          const imageUrl = URL.createObjectURL(res.data); // Crear URL temporal
 
          setImage(imageUrl); // Actualiza el estado
     
  } catch (error) {
      console.error('Error al obtener la imagen:', error);
  }
  }

  
  const Logout = async () => {

    Cookies.remove("Token")
    
    return setIsAuthenticated(false)
  }

 const restablerEstado =()=>{
  setPaso1(false)
  setPaso2(false)
  setPaso3(false)
 }
 





  const datosDelUsuario = async (token) =>{
    const res = await datosUsuario(token)
  
    setNombre_usuario(res.data.fields[0].nombre_usuarios)
    setRol(res.data.fields[0].id_roles)
    setId(res.data.fields[0].id_user)
  }
  useEffect(()=>{
    
const checkLogin =() =>{
const cookie = Cookies.get()




//para verificar existencia token
if(!cookie.Token){
return setIsAuthenticated(false)

}
//para traer datos usuarios logueado
const send = {token:cookie.Token}
 datosDelUsuario(send)
//retornar
return setIsAuthenticated(true)
}

checkLogin()
  },[])


  
const sendImage = async (id,data) => {
  try {
    const res = await sendImageRequest(id, data);

    setSuccessfullyRequest(true)
    setMessageSuccessfully(res.data.message);
    setTimeout(() => {
      setSuccessfullyRequest(false);
    }, 1000);
 
  } catch (error) {
    setMessageError(error.response.data.message);
 
    setErrorRequest(true)
    setMessageSuccessfully(false);
    setTimeout(() => {
      setErrorRequest(false);
    }, 1000);
  }
};


  return (
    <AuthenticationContext.Provider
      value={{
        Login,
        isAuthenticated,
        nombre_usuario,
        rol,
        id,
        messageSuccessfully,
        successfullyRequest,
        messageError,
        errorRequest,
        Logout,
        image,
        enviarEmailCodigo,
        paso1,
        paso2,
        paso3,
        sendVerificarCodigo,
        sendContrasena,
        proceso,
        restablerEstado,
        setPaso1,
        sendImage,
        imagenPerfil
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
