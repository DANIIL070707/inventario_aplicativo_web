import React, { createContext, useContext } from "react";
import { Children } from "react";


export const GestionDeUsuariosContext = createContext()

export const useGestionDeUsuarios = () =>{
    const context = useContext(GestionDeUsuariosContext)

    if(!context){
        throw new Error("useAuth must be used within an GestionDeUsuarios Provider");
    }

    return context
}


export const GestionDeUsuariosProvider = ({children}) =>{



    return (
        <GestionDeUsuariosContext.Provider
        value={{}}
        >
{children}
            </GestionDeUsuariosContext.Provider>
    )
}