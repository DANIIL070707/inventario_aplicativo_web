import React from 'react'
import { useAuth } from './../context/AuthenticationContext';
function Home() {
  const { nombre_usuario} = useAuth()

  const bienvenida = `Bienvenido ${nombre_usuario}`   
  return (
    <div className='text-3xl pl-2 mb-8'>{bienvenida}</div>
  )
}

export default Home