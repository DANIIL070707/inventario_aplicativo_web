import React, { useEffect, useState} from 'react';
import Tables from '../../components/Table';
export default function Bitacora() {




  const columns = [
    { field: 'idBitacora', headerName: 'ID Bitacora', minWidth: 120 },
    { field: 'evento', headerName: 'Evento', minWidth: 120 },
    { field: 'fecha', headerName: 'Fecha', minWidth: 120 }

  ];
  return (
    <div>Bitacora</div>
  )
}
