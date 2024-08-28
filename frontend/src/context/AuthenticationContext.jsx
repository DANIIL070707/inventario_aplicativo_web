import React, { createContext, useContext, useEffect, useState } from "react";
import { LoginRequest, emailCodigo, verificarCodigo, restablecerPass} from "../api/authentication.js";
import { ImagenPerfilRequest } from "../api/perfil.js";
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

  const imagenPerfil = async () => {
    try {
      const res = await ImagenPerfilRequest();
      
    
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
 
  useEffect(()=>{
   imagenPerfil()
      },[])



  useEffect(()=>{
    
const checkLogin =() =>{
const cookie = Cookies.get()

if(!cookie.Token){
return setIsAuthenticated(false)

}
return setIsAuthenticated(true)
}

checkLogin()
  },[])



  return (
    <AuthenticationContext.Provider
      value={{
        Login,
        isAuthenticated,
        nombre_usuario,
        rol,
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
        setPaso1
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
