import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare , faTrash} from "@fortawesome/free-solid-svg-icons";
import TextField from '@mui/material/TextField';

export default function Tables(props) {

  const {rows, columns, options, ModalEditar, deleteData} = props;
  const [search, setSearch] = React.useState('')
  const [dataEdit, setDataEdit] = React.useState([])
  const [abrir, setAbrirModal] = React.useState(false);
  const [cerrar, setCerrarModal] = React.useState(false);

 const limpiarDataEdit = () =>{
  setDataEdit([])
 }
  const cerrarModal = () =>{

    setAbrirModal(false)
    setCerrarModal(true)
  limpiarDataEdit()


    
  }

console.log(dataEdit)
const displayedRows =rows.filter((data)=>
Object.values(data).some((value)=>value.toString().toLowerCase().includes(search.toLocaleLowerCase()))
)
  const filterColumns = options ? [...columns,  {
    field: 'editar',
    headerName: 'Editar',
    minWidth: 50,
    renderCell: (params) => (
      <div style={{ cursor: 'pointer' }} onClick={() => handleEdit(params.row)}>
        <FontAwesomeIcon icon={faPenToSquare} />
      </div>
    ),
  },
  {
    field: 'eliminar',
    headerName: 'Eliminar',
    minWidth: 50,
    renderCell: (params) => (
      <div style={{ cursor: 'pointer' }} onClick={() => handleDelete(params.row)}>
        <FontAwesomeIcon icon={faTrash} />
      </div>
    ),
  },]: columns;

    const handleEdit = (row) => {
    // Lógica para editar 

    
    setDataEdit(row)

    setAbrirModal(true)
  };

  const handleDelete = (row) => {
    // Lógica para eliminar 
    

    deleteData(row.id);

  };

  
  

  return (
    <>
    <div className='content-center px-36'>
    <TextField
        label='Buscar registro'
        value={search}
        onChange={(e)=> setSearch(e.target.value)}
        
        size="small"
      
        />
        <br />
        <br />
    <Box sx={{ height: rows.lenght, width: '100%' }}>
      <DataGrid
       // rows={rows.map(user => ({ ...user, id: user.iduser }))}
       rows={ displayedRows.map(row=>({ ...row, id: row.id }))
        //Object.entries(displayedRows).map(([key, value]) => ({ ...value, id: key }))} 
        // Asegurando que cada fila tenga un id único
       }
        columns={filterColumns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5,1,10]}
      
        disableRowSelectionOnClick
      />
    </Box>    
    </div>
<ModalEditar abrir={abrir} cerrar={cerrarModal}  data={dataEdit} dataRoles={props.dataRoles} />
    </>
  );
}
