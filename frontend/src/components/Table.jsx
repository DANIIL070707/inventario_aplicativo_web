import * as React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';



function Tables(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>


    <div className='content-center px-36' >
    <TableContainer style={{ maxHeight: 440 }} className='bg-slate-200'>
        <Table stickyHeader aria-label="sticky table" className='border-t-4 border-b-4 border-gray-500 rounded-lg' >
          <TableHead >
            <TableRow >
              {props.columns.map((column) => (
                <TableCell
       
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                 
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody >
             {props.rows.map((element)=>
             <TableRow key={element.iduser}>
            <TableCell>{element.iduser}</TableCell>
             <TableCell>{element.nombre_usuarios}</TableCell>
             <TableCell>{element.nombre_completos}</TableCell>
             <TableCell>{element.emails}</TableCell>
          
             </TableRow>
             )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination 
       className=' border-gray-500  rounded-lg'
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={props.rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
      
 
 
 
    </>
  );
}


export default Tables;