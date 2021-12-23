import { useState} from 'react';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import {useNavigate} from 'react-router-dom'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function Add(){
    const history = useNavigate();
    const [newdata, setNewData] = useState({
        ID: "",
        'Avatar Name': "",
        'Performance Score': ""
    });

    const handleChange = (e) => {
        setNewData({...newdata, [e.target.name]: e.target.value});
        console.log(newdata)
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
          const res = await fetch('https://sheet2api.com/v1/hZB7FrSDSaaM/fullstack-assignment', {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify(newdata)
          });
          if(res.ok){
              history("/");
          }
        } catch (error) {
          console.log(error)
        }
    }

    return(
      <Paper sx={{ width: '30%', overflow: 'hidden' }} className="formsubmit" elevation={6}>
      <form>
        <h1>Add Data</h1>
        <TextField id="standard-basic" label="ID" variant="standard" type="text" name="ID" value={newdata.ID} onChange={handleChange} style={{margin:"10px"}} />
        <TextField id="standard-basic" label="Avatar Name" variant="standard" type="text" name="Avatar Name" value={newdata["Avatar Name"]} style={{margin:"10px"}} onChange={handleChange} />
        <TextField id="standard-basic" label="Performance Score" variant="standard" type="text" name="Performance Score" style={{margin:"10px"}} value={newdata["Performance Score"]} onChange={handleChange} />
        <Button variant="contained" onClick={handleSubmit} style={{margin:"20px"}} >Add</Button>
      </form>
    </Paper>
    );
}

export default Add;