import React from 'react'
import { useState } from 'react';
import { Button, Grid, Alert, TextField } from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DateTimePicker  } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';

const Form = ({submitted, setSubmitted}) => {

    const [date, setDate] = useState(new Date());
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isAlert, setIsAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");
    const [alertSeverity, setAlertSeverity] = useState('info');
    
    const DISABLE_ALERT_TIME = 5000;

    const showAlert = (msg, severity)=> {
        setIsAlert(true);
        setAlertSeverity(severity);
        setAlertMsg(msg);
        setTimeout(()=> {
            setIsAlert(false);
        }, [DISABLE_ALERT_TIME]);
    }

    const submitTask = async ()=> {
        if(name==='') {
            showAlert("Please Enter the required fields", 'info')
            return false;
        }
        else setIsAlert(false);
        const res = await fetch('/new-task', {
            method : "POST",
            body : JSON.stringify({name, description, date}),
            headers: { 'Content-Type': 'application/json' },
        });
        if(res.ok){
            showAlert("Task Submitted", 'success');
            setSubmitted(!submitted);
        }
        else{
            showAlert("Something went wrong", 'error');
        }
    }

    return (
        <div style={styles.formdiv}>
            {isAlert &&  <Alert severity={alertSeverity} style={{position : "absolute"}}>{alertMsg}</Alert>}
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
                    <Grid item xs={12}>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <DateTimePicker
                                disablePast
                                label="Choose date"
                                value={date}
                                onChange={(e) => setDate(e._d)}
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
        border : "2px solid #1976d2",
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