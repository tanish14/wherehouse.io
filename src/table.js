import { useEffect, useState} from 'react';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import SyncIcon from '@mui/icons-material/Sync';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom'

export default function Tle() {
  const history = useNavigate();
  const [data, setData] = useState([]);
  const [sync, setSync] = useState("true")

  const getdata = async() => {
    try {
      const res = await fetch('https://sheet2api.com/v1/9x1myOAETlqd/fullstack-assignment');
      const data = await res.json();
      setData(data);
      console.table(data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getdata();
  }, [sync])

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

      <TableContainer component={Paper} sx={{ width: '60%'}} elevation={6} style={{margin:"100px 300px"}}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Avatar Name</TableCell>
            <TableCell align="right">Performance Score<SyncIcon className="sync" onClick={handleClick} style={{cursor:"pointer", marginLeft:"20px"}} /></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((row) => (
            row.ID !== '' ? 
            (<TableRow
              key={row.ID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.ID}
              </TableCell>
              <TableCell align="right">{row['Avatar Name']}</TableCell>
              <TableCell align="right">{row['Performance Score']}</TableCell>
            </TableRow>): console.log("undefined")
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}