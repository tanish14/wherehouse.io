import { useEffect, useState} from 'react';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import SyncIcon from '@mui/icons-material/Sync';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom'

const columns = [
    { id: 'ID', label: 'ID', minWidth: 170 },
    { id: 'Avatar Name', label: 'Avatar Name', minWidth: 100},
    { id: 'Performance Score', label: 'Performance Score', minWidth: 100}
  ];

function Tle(){
    const history = useNavigate();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [data, setData] = useState([])
    const [sync, setSync] = useState("true")
  
  const getdata = async() => {
    try {
      const res = await fetch('https://sheet2api.com/v1/9x1myOAETlqd/fullstack-assignment');
      const data = await res.json();
      setData(data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getdata();
  }, [sync])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClick = () => {
    setSync(!sync)
  }

  const handleAdd = () => {
    history("/add")
  }
  

  return (
    <div>

    <Stack spacing={140} direction="row" style={{backgroundColor:"#212429", color:"white", padding:"10px 10px 10px 50px"}}>
        <h1>Google Sheet</h1>
        <Button variant="contained" onClick={handleAdd}>Add</Button>
    </Stack>

    <Paper className="tabledata" sx={{ width: '50%', overflow: 'hidden'}} elevation={6}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table" >
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth}}
                >
                  {column.label}
                </TableCell>
              ))}
              <SyncIcon className="sync" onClick={handleClick} style={{cursor:"pointer"}} />
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.ID}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </div>
  );
}

export default Tle;