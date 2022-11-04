import React from 'react'
import { useState, useEffect } from 'react';
import { Button, Grid, Alert, TextField } from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';

const Form = () => {

    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isAlert, setIsAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");
    const submitTask = async ()=> {
        if(name=='') {
            setIsAlert(true);
            setAlertMsg("Please Enter the required fields")
            return false;
        }
        else setIsAlert(false);
        const res = await fetch('/new-task', {
            method : "POST",
            body : JSON.stringify({name, description, date, time}),
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await res.json();
        if(res.ok){
            setIsAlert(true);
            setAlertMsg("Task Submitted");
        }
        else{
            setIsAlert(true);
            setAlertMsg("Something went wrong");
        }
    }

    return (
        <div style={styles.formdiv}>
            {isAlert &&  <Alert severity="info" style={{position : "absolute"}}>{alertMsg}</Alert>}
            <div style={styles.heading}>
                Task Creater
            </div>
            <p>
                Create new tasks here
            </p>
            <div style={styles.formCenter}>
            <Grid container style={styles.form} onSubmit={submitTask}>
                <Grid sx={styles.margin} item xs={12}>
                    <TextField 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth 
                        style={styles.textfield} 
                        id="outlined-basic" 
                        label="Task Name" 
                        variant="outlined" 
                    />
                </Grid>
                <Grid item xs={12} sx={styles.margin}>
                    <TextField
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Task Description"
                        fullWidth
                        maxRows={3}
                        multiline
                        variant="outlined"
                    />
                </Grid>
                <Grid container>
                    <Grid item xs={6}>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <DatePicker
                                disablePast
                                label="Choose date"
                                value={date}
                                onChange={(e) => setDate(e._d)}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={6} >
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <TimePicker
                                label="Set Time"
                                value={time}
                                onChange={(e) => setTime(e._d)}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                </Grid>
                <Grid item sx={{marginTop: "20px"}} xs={5}>
                    <Button onClick={submitTask} variant="contained" fullWidth>Submit</Button>
                </Grid>
            </Grid> 
            </div>
        </div>
    );
}

const styles =  {
    formdiv : {
        textAlign : "center",
        // backgroundColor : "red",
        color : "#1976d2",
        padding : "20px",
    },
    heading : {
        fontFamily : "sans-serif",
        fontSize : "3rem",
        fontWeight : "600",
        margin : "20px"
    },
    form : {
        justifyContent : "center",
        width: "75%",
        // backgroundColor : "grey",
        marginTop : "5px",
        padding : "10px",
        paddingBottom : "20px",
        borderRadius : "10px",
        minWidth : "350px",
        border : "2px solid black",
    },
    formCenter : {
        display : "flex",
        justifyContent : "center",
    },
    textfield : {
        minWidth : "400px !important",
    },
    margin : {
        margin : "15px",
    },

}

export default Form;