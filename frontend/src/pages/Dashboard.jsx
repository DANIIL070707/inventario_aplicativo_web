import React, { useEffect, useState } from 'react';
import Siderbar from '../components/Siderbar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Home from './Home';
import GestionUsuarios from './administracion/GestionUsuarios';
import Parametros from './administracion/Parametros';
import Bitacora from './administracion/Bitacora';
import { Route, Routes } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="main-content">
        <Siderbar className="sidebar" />
        <div className="content-start">
          <Routes>
          <Route index element={<Home/>}/>
          <Route path='gestionUsuarios' element={<GestionUsuarios/>}/>
          </Routes>
 
        </div>
      </div>
     
    </div>
  );
}


export default Dashboard;
