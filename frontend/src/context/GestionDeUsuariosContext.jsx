import React, { createContext, useContext, useState } from "react";
import {getUsuarios} from '../api/gestionUsuarios.js'


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

 const traerUsuarios = async ()  =>{
    try {
        const res = await getUsuarios()
       return setData(res.data)

    } catch (error) {
        console.log(error)
    }
 }


    return (
        <GestionDeUsuariosContext.Provider
        value={{
           data, traerUsuarios
        }}
        >
{children}
            </GestionDeUsuariosContext.Provider>
    )
}