import {React, useEffect, useState} from 'react';
import image from './assets/2897785.png'
import { useAuth } from './context/AuthenticationContext';
import { useNavigate } from 'react-router-dom';
import {useForm} from 'react-hook-form'
import toast, {Toaster} from 'react-hot-toast'
import ModalRestablecerContrasena from './components/ModalRestablecerContrasena';

function Login() {
  const { isAuthenticated, Login, successfullyRequest, messageSuccessfully, errorRequest,
    messageError, enviarEmailCodigo,paso1,setPaso1,paso2, paso3,sendVerificarCodigo, sendContrasena,proceso, restablerEstado


   } = useAuth();

   const [abrir, setAbrirModal] = useState(false);
   const [cerrar, setCerrarModal] = useState(false);

  const {register, handleSubmit, formState:{errors}} = useForm()

  const LoginRequest = handleSubmit(data=>{
     Login(data)
  })


  const abrirModal = () =>{
    setPaso1(true)
    setAbrirModal(true)

  }

  const cerrarModal = () =>{

    setAbrirModal(false)
    setCerrarModal(true)

    
  }


  useEffect(()=>{
if(successfullyRequest){
  toast.success(messageSuccessfully)
}
},[successfullyRequest])

useEffect(()=>{
  if(errorRequest){
    toast.error(messageError)
  }
  },[errorRequest])

  const navigate = useNavigate()

  useEffect(()=>{
if(isAuthenticated) navigate ('/dashboard')
  },[isAuthenticated])

  if (isAuthenticated) {
    return null; // o algún tipo de loader/spinner
  }

console.log(paso1)
  return (
    <>
      <div className="px-64">
   
      
      

   <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm border-8 border-[#373A40] rounded-lg   px-4 py-4 ">
           <form  onSubmit={LoginRequest} className="space-y-6">
             <div>
             <img alt="Your Company" src={image} className="mx-auto h-20 w-auto" />
           <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-whit bg-[686D76] rounded-full">
             Gestión de Inventarios
           </h2>
           <br />
               <label htmlFor="text" className="block text-sm font-medium leading-6">
                 Usuario
               </label> 
               <div className="mt-2">
                 <input
                 {...register('nombre_usuario', {required: true})}
               
                   id="nombre_usuario"
                   name="nombre_usuario"
                   type="text"
                   required
                   autoComplete="nombre_usuario"
                   className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                
                />
                   {errors.nombre_usuario && (<p> El nombre usuario de es requerido</p>)}
               </div>
             </div>
   
             <div>
               <div className="flex items-center justify-between">
                 <label htmlFor="password" className="block text-sm font-medium leading-6">
                   Contraseña
                 </label>
                 <div className="text-sm">
                   <a onClick={abrirModal} className="font-semibold text-gray-900 hover:text-gray-900 cursor-pointer">
                     Olvido su contraseña?
                   </a>
                 </div>
               </div>
               <div className="mt-2">
                 <input
                  {...register('contrasena', {required: true})}
               
                   id="contrasena"
                   name="contrasena"
                   type="password"
                   required
                   autoComplete="current-password"
                   className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                 />
                     {errors.contrasena && (<p> la contrasena es requerida</p>)}
               </div>
             </div>
   
             <div>
               <button
                 type="submit"
                 className="flex w-full justify-center rounded-md bg-[#373A40] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-[#373A40]"
               >
                 Entrar
               </button>
               <br />
             </div>
           </form>
         </div>
   </div>
       
     
       <Toaster/>
       <ModalRestablecerContrasena abrir={abrir} cerrar={cerrarModal} enviarEmailCodigo={enviarEmailCodigo} successfullyRequest={successfullyRequest}
       paso1={paso1} paso2={paso2} paso3={paso3} sendVerificarCodigo={sendVerificarCodigo} sendContrasena={sendContrasena}
      proceso={proceso} restablerEstado={restablerEstado}
       />
    </>
  );
}

export default Login;
