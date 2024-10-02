import React from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import {useForm} from 'react-hook-form'

function ModalInsertar(props) {
   
  const {register, handleSubmit, formState:{errors}, reset} = useForm()

  
  const registerRequest = handleSubmit(data=>{
    data.rol_id = parseInt(data.rol_id, 10);
    props.insertFunction(data)
         
 })
  
 const cerrar = () =>{
    
    props.cerrar()
    reset()
 }
  return (
    <Dialog open={props.abrir} onClose={cerrar} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      />
      
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
          >
            <form onSubmit={registerRequest} className="w-full max-w-lg p-6">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block  tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                    Nombre de usuarios
                  </label>
                  <input 
                  {...register('nombre_usuario', {required: true})}
            
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" 
                  id="nombre_usuario"
                  name="nombre_usuario"
                  type="text"
                
                   placeholder="Jane" />
                     {errors.nombre_usuario && (<p className=' bg-gray-700 text-white font-bold text-xs'> El nombre de usuario es requerido</p>)}
                </div>
                <div className="w-full md:w-1/2 px-">
                  <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                    Nombre Completo
                  </label>
                  <input
                   {...register('nombre_completo', {required: true})}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" 
                  id="nombre_completo" name="nombre_completo" type="text" placeholder="Doe" />
                    {errors.nombre_completo && (<p className=' bg-gray-700 text-white font-bold text-xs'> El nombre es requerido</p>)}
                </div>
                <br/>
             
                <div className="w-full md:w-1/2 px-3">
                  <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                    Email
                  </label>
                  <input 
                  {...register('email', {required: true})}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  id="email" 
                  name="email"
                  type="email" 
                  placeholder="correo@example.com" />
                    {errors.email && (<p className=' bg-gray-700 text-white font-bold text-xs'> El email es requerido</p>)}
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label className="block  tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                    Contrasena
                  </label>
                  <input 
                  {...register('contrasena', {required: true})}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" 
                  id="contrasena"
                  name="contrasena"
                   type="password" 
                   placeholder="******************" />
                     {errors.contrasena && (<p className=' bg-gray-700 text-white font-bold text-xs'> La contrasena es requerida</p>)}
                </div>
              </div>
              <div class="relative">
              <label className="block  tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                    Rol
                  </label>
               
        <select 
         {...register('rol_id', {required: true})}
        class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
        id="rol_id"
        name="rol_id"
        
        >
             <option value="">Seleccione un rol</option> 
        {props.dataRoles.map((element) =>(
                    <option key={element.idroles} value={element.idroles}>
                        {element.nombres}
                        </option>
            ))}
        </select>
        {errors.rol_id && (<p className=' bg-gray-700 text-white font-bold text-xs'>El rol es requerido</p>)}

        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
                  <button className="border-b-4 border-zinc-950  p-2  mt-2 text-zinc-950 bg-slate-200 rounded"   type="submit">
                    Registrar
                  </button>
                </div>
                <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
                  <button onClick={cerrar} className="border-b-4 border-zinc-950  p-2  mt-2 text-zinc-950 bg-slate-200 rounded" type="button">
                    Cancelar
                  </button>
                </div>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default ModalInsertar;
