import React, { useEffect, useState } from 'react';
import Siderbar from '../components/Siderbar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Home from './Home';
import GestionUsuarios from './administracion/GestionUsuarios/GestionUsuarios';
import Parametros from './administracion/Parametros';
import Bitacora from './administracion/Bitacora';
import Perfil from './perfil/Perfil';
import { Route, Routes } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="main-content ">
        <Siderbar className="sidebar" />
        <div className="content-start">
          <Routes>
          <Route index element={<Home/>}/>
          <Route path='gestionUsuarios' element={<GestionUsuarios/>}/>
          <Route path='perfil' element={<Perfil/>}/>
          </Routes>
 
        </div>
      </div>
     
    </div>
  );
}


export default Dashboard;
