import React, { useEffect, useState} from 'react';
import Tables from '../../../components/Table';
import { useGestionDeUsuarios } from '../../../context/GestionDeUsuariosContext';
import ModalInsertar from './componentes/modalInsertar';
import ModalEditar from './componentes/modalEditar';
import toast from 'react-hot-toast'

export default function GestionUsuarios() {
  const { data, traerUsuarios,  dataRoles, traerRoles, registerData,deleteData, errorRequest,
    messageError, successfullyRequest,
    messageSuccessfully } = useGestionDeUsuarios();
  const [abrir, setAbrirModal] = useState(false);
  const [cerrar, setCerrarModal] = useState(false);

  const abrirModal = () =>{

    setAbrirModal(true)

  }

  const cerrarModal = () =>{

    setAbrirModal(false)
    setCerrarModal(true)

    
  }
  useEffect(() => {
    traerUsuarios();
  }, []);

  useEffect(() => {
    traerRoles();

}, []);

useEffect(()=>{
  if(successfullyRequest){
    toast.success(messageSuccessfully)
    traerUsuarios()
    cerrarModal()
  }
  },[successfullyRequest])
  
  useEffect(()=>{
    if(errorRequest){
      toast.error(messageError)
    }
    },[errorRequest])

  const columns = [
    { field: 'iduser', headerName: 'ID Usuario', minWidth: 120 },
    { field: 'nombre_usuarios', headerName: 'Nombre de Usuario', minWidth: 120 },
    { field: 'nombre_completos', headerName: 'Nombre Completo', minWidth: 120 },
    { field: 'emails', headerName: 'Email', minWidth: 120 }

  ];

  return (
    <>
      <h1 className='text-3xl pl-2 mb-8'>Gestión de Usuarios</h1>
      <div className='flex justify-center tems-center'>
      <button onClick={abrirModal} className=" border-b-4 border-zinc-950  p-2  mt-2 text-zinc-950 bg-slate-200 rounded">
  Agregar usuario
</button>
      </div>
   <br />
      <Tables rows={data} columns={columns} options={true} ModalEditar={ModalEditar}
dataRoles={dataRoles} deleteData={deleteData}
      />

      <ModalInsertar abrir={abrir} cerrar={cerrarModal} dataRoles={dataRoles}   insertFunction={registerData} />

    </>
  );
}
