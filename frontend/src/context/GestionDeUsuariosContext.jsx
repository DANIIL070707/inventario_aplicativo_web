import React, { createContext, useContext, useState, useEffect } from "react";

import {getUsuarios, getRoles, register, updateUser, deleteUser} from '../api/gestionUsuarios.js'


export const GestionDeUsuariosContext = createContext()

export const useGestionDeUsuarios = () =>{
    const context = useContext(GestionDeUsuariosContext)

    if(!context){
        throw new Error("useAuth must be used within an GestionDeUsuarios Provider");
    }

    return context
}


export const GestionDeUsuariosProvider = ({children}) =>{
 const [data, setData] = useState([])
 const [dataRoles, setDataRoles] = useState([])
 const [errorRequest, setErrorRequest] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [successfullyRequest, setSuccessfullyRequest] = useState(false);
  const [messageSuccessfully, setMessageSuccessfully] = useState("");
 const traerUsuarios = async ()  =>{
    try {
        const res = await getUsuarios()
       setData(res.data)

    } catch (error) {
        console.log(error)
    }
 }

 const traerRoles = async ()  =>{
    try {
        const res = await getRoles()

    setDataRoles(res.data)

    } catch (error) {
        console.log(error)
    }
 }

 const registerData = async (usuario) => {
    try {
      const res = await register(usuario);

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


  
 const updateData = async (id,usuario) => {
  try {
    const res = await updateUser(id,usuario);

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


const deleteData = async (id) => {
  try {
    const res = await deleteUser(id);

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
        <GestionDeUsuariosContext.Provider
        value={{
           data, traerUsuarios,
           dataRoles, traerRoles,
           registerData,updateData,deleteData,errorRequest,
           messageError, successfullyRequest,
           messageSuccessfully
        }}
        >
{children}
            </GestionDeUsuariosContext.Provider>
    )
}