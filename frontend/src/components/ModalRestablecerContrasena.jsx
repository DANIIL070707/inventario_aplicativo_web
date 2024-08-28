import { useEffect, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

import { useForm } from 'react-hook-form'

function ModalRestablecerContrasena(props) {

  const {register, handleSubmit, formState:{errors}} = useForm()

  const [email, setEmail] = useState('')


  const enviarCodigoV = handleSubmit(data=>{
    props.enviarEmailCodigo(data)
    setEmail(data.email)
    
  })

  const verificarCodigoV = handleSubmit(data=>{
   // props.endVerificarCodigo(data)
    const dataFinal = {...data, email: email}
    props.sendVerificarCodigo(dataFinal)
    
  })


  const restablecerPass = handleSubmit(datos =>{
    const datafinalPass = {...datos, email: email}
    props.sendContrasena(datafinalPass)

  })


 


const cancelar = () => {
  props.cerrar()
  props.restablerEstado()
}

useEffect(()=>{
 if(props.proceso){
  cancelar()


 } 
})
 
  


  return (
    <Dialog open={props.abrir} onClose={props.cerrar} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
           {props.paso1 && (

             <>
             <form onSubmit={enviarCodigoV}>
             <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>

                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      Paso 1. Ingrese su correo asociado a su cuenta
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Recibirá un código para continuar con el proceso de restablecer contraseña.
                      </p>
                      <br />

                      <input

                       {...register('email', {required: true})}
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                    {errors.email && (<p> El correo usuario de es requerido</p>)}
                  </div>

                </div>
              </div><div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                  >
                    Enviar
                  </button>
                  <button
                    type="button"
                    data-autofocus
                    onClick={cancelar}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-500 sm:mt-0 sm:w-auto"
                  >
                    Cancelar
                  </button>
                </div>
                </form>
                </>
                
           )}


{props.paso2 && (

<>
<form onSubmit={verificarCodigoV}>
<div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
   <div className="sm:flex sm:items-start">
     <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
         <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
       </svg>

     </div>
     <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
       <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
         Paso 2. Ingrese el codigo
       </DialogTitle>
       <div className="mt-2">
      
         <br />

         <input

          {...register('codigo', {required: true})}
           id="codigo"
           name="codigo"
           type="text"
           required
           autoComplete="codigo"
           className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
       </div>
       {errors.codigo && (<p> El codigo es requerido</p>)}
     </div>

   </div>
 </div><div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
     <button
       type="submit"
       className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
     >
       Enviar
     </button>
     <button
       type="button"
       data-autofocus
       onClick={cancelar}
       className="mt-3 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-500 sm:mt-0 sm:w-auto"
     >
       Cancelar
     </button>
   </div>
   </form>
   </>
   
)}

{props.paso3 && (

<>
<form onSubmit={restablecerPass}>
<div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
   <div className="sm:flex sm:items-start">
     <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
         <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
       </svg>

     </div>
     <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
       <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
         Paso 3. Ingrese la nueva contrasena
       </DialogTitle>
       <div className="mt-2">
       <p className="text-sm text-gray-500">
                        Contrasena
                      </p>
        

         <input

          {...register('contrasena1', {required: true})}
           id="contrasena1"
           name="contrasena1"
           type="password"
           required
           autoComplete="contrasena1"
           className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
       </div>
       {errors.contrasena1 && (<p> La contrasena es requerido</p>)}

       <div className="mt-2">
      
      <br />
      <p className="text-sm text-gray-500">
                       Repita la contrasena
                      </p>
      <input

       {...register('contrasena2', {required: true})}
        id="contrasena2"
        name="contrasena2"
        type="password"
        required
        autoComplete="contrasena2"
        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
    </div>
    {errors.contrasena2 && (<p>Repetir la contrasena es requerido</p>)}
     </div>


     
     <br />
     

   </div>
 </div><div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
     <button
       type="submit"
       className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
     >
       Enviar
     </button>
     <button
       type="button"
       data-autofocus
       onClick={cancelar}
       className="mt-3 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-500 sm:mt-0 sm:w-auto"
     >
       Cancelar
     </button>
   </div>
   </form>
   </>
   
)}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default ModalRestablecerContrasena