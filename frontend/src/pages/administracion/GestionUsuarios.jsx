import React, { useEffect } from 'react'
import Tables from '../../components/Table'
import { useGestionDeUsuarios } from '../../context/GestionDeUsuariosContext';
export default function GestionUsuarios() {

  const {data, traerUsuarios} = useGestionDeUsuarios()

  useEffect(() => {
    traerUsuarios();
}, []);

console.log("Datos actuales:", data); // Puede mostrar vacío inicialmente
  const columns = [
    { id: 'id_users', label: 'id_users', minWidth: 120 },
    { id: 'nombre_usuarios', label: 'nombre_usuarios', minWidth: 120 },
    { id: 'nombre_completos', label: 'nombre_completos', minWidth: 120 },
    { id: 'emails', label: 'emails', minWidth: 120 },
    {editar: 'Editar', label: 'Editar', minWidth: 50 },
    {eliminar: 'Eliminar', label: 'Eliminar', minWidth: 50 },
  
  ];
  
 
  

  return (
    <>
  <h1 className='text-3xl pl-2 mb-8 ' >Gestion de usuarios</h1>
  <Tables rows={data} columns={columns}/>
  </>
  )
}
