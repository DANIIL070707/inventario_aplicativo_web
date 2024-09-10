import React, { useState } from "react";
import { useAuth } from "../context/AuthenticationContext";
import { Link } from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faUserTie,faUser, faScrewdriverWrench, faWarehouse, faCircleArrowLeft, faCircleArrowRight,
  faSquareCaretUp,faSquareCaretDown
} from '@fortawesome/free-solid-svg-icons';

function Sidebar() {


  const [open, setOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openCategories, setOpenCategories] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null)
  const menu = {
    categorias: [
      {
        nombre: "Administracion",
        icon: faUserTie,
        subcategorias: [
          { nombre: "Gestión de Usuarios", link: "/dashboard/gestionUsuarios", icon:faUser},
          { nombre: "Configuración", link: "/dashboard/configuracion", icon:faScrewdriverWrench },
        ],
      },

      {
        nombre:"Inventario",
        icon:faWarehouse,
        subcategorias:[
          { nombre: "Reportes de Ventas", link: "/ventas/reportes",icon:faUser }
        ]
      }
    ],
  };
  const handleDropdown = (index) => {

    setSelectedCategory(index === selectedCategory ? null : index);
    setOpenCategories((prevState)=>({
      ...prevState,
      [index]: !prevState[index]

    }));
  };

 
  return (
    <div className="flex bg-white border-r-4 border-slate-200 rounded-lg">
      <div
        className={`${
          open ? "w-64" : "w-20"
        } bg-dark-purple h-screen p-5 pt-8 relative duration-300 overflow-hidden`}
      >
     
     <FontAwesomeIcon 
  className={`${open ? "absolute cursor-pointer -right-4 top-2 w-12" : "absolute cursor-pointer -right-4 top-2 w-12"}`} 
  icon={open ? faCircleArrowLeft : faCircleArrowRight}
  onClick={() => setOpen(!open)}
/>
        {/* Menú desplegable sin <details> */}
        {menu.categorias.map((categoria, index) => (
          <div key={index} className="content-center mb-2   ">
       
            <button
              onClick={() => handleDropdown(index)}
              className="w-full bg-slate-200 hover:bg-slate-40 text-zinc-950 font-bold py-2 px-2 border-b-4 border-zinc-950 hover:border-zinc-500 rounded"
            >
               <FontAwesomeIcon icon={categoria.icon}/>    &nbsp; 
               {categoria.nombre} &nbsp;
         
               {selectedCategory === index && <FontAwesomeIcon icon={faSquareCaretDown}/>}
            </button>
            {openCategories[index] && (
              <ul className="border-t-4 border-b-4 border-zinc-950 w-full p-2  mt-2 text-zinc-950 bg-slate-200 rounded " >
                {categoria.subcategorias.map((subcategoria, subIndex) => (
                  <li key={subIndex} className="border-b-4  mt-2  hover:bg-slate-50 rounded">
                  <FontAwesomeIcon icon={subcategoria.icon}/>
              
                    <Link to={subcategoria.link}> {subcategoria.nombre}</Link>
       
                  </li>
       
                ))}
                    
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
