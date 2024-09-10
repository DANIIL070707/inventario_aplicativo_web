import React from 'react'
import Tables from '../../components/Table'

export default function GestionUsuarios() {
  const columns = [
    { id: 'Id', label: 'Id', minWidth: 120 },
    { id: 'Usuario', label: 'Usuario', minWidth: 120 },
    { id: 'Email', label: 'Email', minWidth: 120 },
    { id: 'Estado', label: 'Estado', minWidth: 120 },
    {editar: 'Editar', label: 'Editar', minWidth: 50 },
    {eliminar: 'Eliminarr', label: 'Eliminar', minWidth: 50 },
  
  ];
  
  function createData(Id, Usuario, Email, Estado) {
    return { Id, Usuario, Email, Estado};
  }
  
  const rows = [
    createData('India', 'IN', 1324171354, 3287263),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),
    createData('United States', 'US', 327167434, 9833520),
    createData('Canada', 'CA', 37602103, 9984670),
    createData('Australia', 'AU', 25475400, 7692024),
    createData('Germany', 'DE', 83019200, 357578),
    createData('Ireland', 'IE', 4857000, 70273),
    createData('Mexico', 'MX', 126577691, 1972550),
    createData('Japan', 'JP', 126317000, 377973),
    createData('France', 'FR', 67022000, 640679),
    createData('United Kingdom', 'GB', 67545757, 242495),
    createData('Russia', 'RU', 146793744, 17098246),
    createData('Nigeria', 'NG', 200962417, 923768),
    createData('Brazil', 'BR', 210147125, 8515767),
  ];
  return (
    <>
  <h1 className='text-3xl pl-2 mb-8 ' >Gestion de usuarios</h1>
  <Tables rows={rows} columns={columns}/>
  </>
  )
}
