import React from 'react'
import { useState, useEffect } from 'react';
import {  Divider, Tab, Tabs, Grid } from '@mui/material';
import './drawer.css';
import { ColorRing } from  'react-loader-spinner'

const Drawer = ({submitted}) => {

    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (event, newTabIndex) => {
        setTabIndex(newTabIndex);
    };

    var taskElem = document.getElementsByClassName('task')[0];
    var taskHeight = taskElem!==undefined ? taskElem.offsetHeight : undefined;
    taskHeight += taskHeight!==undefined ? parseInt(window.getComputedStyle(taskElem).getPropertyValue('margin-top')) : undefined;

    const tabListStyle = {
        overflowY : tabIndex===1 ? "scroll" : "visible",
        maxHeight : taskHeight*6,
    }

    const [upcomingTasks, setUpcomingTasks] = useState([]);
    const [allTasks, setAllTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const getUpcomingTasks = async ()=> {
        setLoading(true);
        const res = await fetch('/upcoming-tasks');
        if(!res.ok) return false;
        const data = await res.json();
        data.map((task)=> {
            task.date = new Date(task.date);
        });
        setUpcomingTasks(data);
        setLoading(false);
    }

    const getAllTasks = async ()=> {
        setLoading(true);
        const res = await fetch('/all-tasks');
        if(!res.ok) return false;
        const data = await res.json();
        data.map((task)=> {
            task.date = new Date(task.date);
        });
        setAllTasks(data);
        setLoading(false);
    }

    useEffect(()=> {
        getUpcomingTasks();
        getAllTasks();
    }, [submitted]);

    const TasksList = ({list}) => {
        
        return(
            <Grid className='tabList' container sx={tabListStyle}>
                {list.map((task, i)=> {
                    return(
                        <Grid key={i} className='task' sx={styles.taskGrid} container>
                            <Grid xs={8} item>
                                <Grid item sx={styles.name} xs={12}>{task.name}</Grid>
                                {task.description!=="" && <Grid item sx={styles.description} xs={12}>{task.description}</Grid>}
                                {task.description==="" && <Grid item sx={styles.description} xs={12}>No Description</Grid>}
                            </Grid>
                            <Grid xs={4} item sx={{textAlign : "right"}}>
                                <Grid item sx={styles.date} xs={12}>{task.date.toDateString()}</Grid>
                                <Grid item sx={styles.time} xs={12}>{task.date.toLocaleTimeString()}</Grid>
                            </Grid>
                        </Grid>
                    )
                })}
            </Grid>
        )
    }

    return (
        <Grid style={styles.drawer} container>
            <Grid item xs={12} >
                <Tabs
                    variant="fullWidth" 
                    value={tabIndex} 
                    onChange={handleTabChange}
                >
                    <Tab style={{minWidth : "50%"}} label="Upcoming" />
                    <Tab style={{minWidth : "50%"}} label="All" />
                </Tabs>
                <Divider />
            </Grid>
            {!loading && <TasksList list={(tabIndex===0) ? upcomingTasks : allTasks}/>}
            {loading && <ColorRing
                height="80"
                width="80"
                colors={['#cacaca']}
            />}
        </Grid>
    );
}

const styles = {
    drawer : {
        padding : "20px",
        // borderLeft : "2px solid rgb(20, 94, 168)",
        // height : "100vh",
        justifyContent : "center",
    },
    taskGrid : {
        backgroundColor : "#1976d2",
        marginTop : "20px",
        alignItems : "center",
        padding : "15px",
        borderRadius : "5px",
        fontFamily : "Ubuntu, sans-serif",
        color : "#FFF",
    },
    name : {
        fontSize : "1.5rem",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        marginBottom : "5px",
    },
    description : {
        fontSize : "0.7rem",
        fontStyle : "italic",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
    date : {
        fontSize : "0.8rem",
        marginBottom : "5px",
    },
    time : {
        fontSize : "0.8rem",
    }
}
 
export default Drawer;