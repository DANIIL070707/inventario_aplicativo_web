
import { useState, useEffect } from 'react';
import { PhotoIcon} from '@heroicons/react/24/solid'
import { useAuth } from '../../context/AuthenticationContext';
import {useForm} from 'react-hook-form'
import toast from 'react-hot-toast';
export default function Perfil() {
    const {image, sendImage , errorRequest,
        messageError, successfullyRequest,
        messageSuccessfully, id , imagenPerfil} = useAuth();

    const [selectedImage, setSelectedImage] = useState(null);
    const {register, handleSubmit} = useForm()

    const   dataSend = parseInt(id, 10); 

    const sendImageR= handleSubmit(data=>{
     

        const formData = new FormData()
        formData.append('file-upload', data.image[0])
   
    sendImage(dataSend,formData)
     })


   const handleImageChange = (event) => {
    const file = event.target.files[0]

    if(file){
        const reader = new FileReader()
      
        reader.onloadend =() => {
            setSelectedImage(reader.result)
        }

        reader.readAsDataURL(file)
    }
   }
   
   useEffect(()=>{
    if(successfullyRequest){
      toast.success(messageSuccessfully)
   
      imagenPerfil({id:dataSend});
    }
    },[successfullyRequest])
    
    useEffect(()=>{
      if(errorRequest){
        toast.error(messageError)
      }
      },[errorRequest])
  return (
    
    
    
    
    <>
    <h1 className='text-3xl pl-2 mb-8'>Cambiar foto de perfil</h1>
    <form  onSubmit={sendImageR}> 

          <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
              Mi foto
          </label>
          <div className="mt- flex items-center gap-x-3">
              <img
                  alt=""
                  src={image}
                  className="h-20 w-20 rounded-full" />

          </div>

          <br />

          <label htmlFor="cover-photo" className="block text-sm font-medium leading-8 text-gray-900">
              Elegir foto
          </label>
          <div className="mt-4 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                  {selectedImage ? (
                      <div className="mt-4">
                          <img
                              src={selectedImage}
                              alt="Previsualización de la imagen"
                              className="h-20 w-20 rounded-full" />
                      </div>
                  ) : (<PhotoIcon aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300" />)}

                  <div className="mt-8 flex text-sm leading-8 text-gray-600">
                    <input 
                     {...register('userId', { required: true })}
                    type="hidden" defaultValue='15' />
                      <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                          <span>Selecciona una imagen</span>
                          <input
    {...register('image', { required: true })} // Mantén 'image' como el nombre
    onChange={handleImageChange}
    accept="image/png, image/jpeg"
    id="file-upload"
    type="file"
    className="sr-only"
/>
                      </label>

                  </div>
                  <p className="text-md leading-5 text-gray-600">PNG o JPG</p>
                  {selectedImage && (
                      <button
                          type="submit"
                          className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      >
                          Aceptar cambio
                      </button>
                  )}

              </div>
          </div>




      </form></>
  )
}
