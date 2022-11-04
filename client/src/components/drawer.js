import React from 'react'
import { useState } from 'react';
import {  Divider, Tab, Tabs, Box, Grid } from '@mui/material';
import './drawer.css';

const Drawer = () => {

    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (event, newTabIndex) => {
        setTabIndex(newTabIndex);
    };
    
    const upcomings = [
        {name : "First Task", description : "small", date : new Date(), time : new Date()},
        {name : "Very very lengthy task name", description : "", date : new Date(), time : new Date()},
        {name : "Third Task", description : "arisfgniubfgiuegniupetfbgiuefbguiebguiebfguiegiub", date : new Date(), time : new Date()},
    ]

    const all = [
        {name : "First Task", description : "small", date : new Date(), time : new Date()},
        {name : "Very very lengthy task name", description : "", date : new Date(), time : new Date()},
        {name : "Third Task", description : "arisfgniubfgiuegniupetfbgiuefbguiebguiebfguiegiubarisfgniubfgiuegniupetfbgiuefbguiebguiebfguiegiubarisfgniubfgiuegniupetfbgiuefbguiebguiebfguiegiub", date : new Date(), time : new Date()},
        {name : "Fourth Task", description : "Decent task", date : new Date(), time : new Date()},
        {name : "First Task", description : "small", date : new Date(), time : new Date()},
        {name : "Very very lengthy task name", description : "", date : new Date(), time : new Date()},
        {name : "Third Task", description : "arisfgniubfgiuegniupetfbgiuefbguiebguiebfguiegiubarisfgniubfgiuegniupetfbgiuefbguiebguiebfguiegiubarisfgniubfgiuegniupetfbgiuefbguiebguiebfguiegiub", date : new Date(), time : new Date()},
        {name : "Fourth Task", description : "Decent task", date : new Date(), time : new Date()},
        {name : "First Task", description : "small", date : new Date(), time : new Date()},
        {name : "Very very lengthy task name", description : "", date : new Date(), time : new Date()},
        {name : "Third Task", description : "arisfgniubfgiuegniupetfbgiuefbguiebguiebfguiegiubarisfgniubfgiuegniupetfbgiuefbguiebguiebfguiegiubarisfgniubfgiuegniupetfbgiuefbguiebguiebfguiegiub", date : new Date(), time : new Date()},
        {name : "Fourth Task", description : "Decent task", date : new Date(), time : new Date()},
        {name : "First Task", description : "small", date : new Date(), time : new Date()},
        {name : "Very very lengthy task name", description : "", date : new Date(), time : new Date()},
        {name : "Third Task", description : "arisfgniubfgiuegniupetfbgiuefbguiebguiebfguiegiubarisfgniubfgiuegniupetfbgiuefbguiebguiebfguiegiubarisfgniubfgiuegniupetfbgiuefbguiebguiebfguiegiub", date : new Date(), time : new Date()},
        {name : "Fourth Task", description : "Decent task", date : new Date(), time : new Date()},
        {name : "First Task", description : "small", date : new Date(), time : new Date()},
        {name : "Very very lengthy task name", description : "", date : new Date(), time : new Date()},
        {name : "Third Task", description : "arisfgniubfgiuegniupetfbgiuefbguiebguiebfguiegiubarisfgniubfgiuegniupetfbgiuefbguiebguiebfguiegiubarisfgniubfgiuegniupetfbgiuefbguiebguiebfguiegiub", date : new Date(), time : new Date()},
        {name : "Fourth Task", description : "Decent task", date : new Date(), time : new Date()},
    ]

    var taskElem = document.getElementsByClassName('task')[0];
    var taskHeight = taskElem!==undefined ? taskElem.offsetHeight : undefined;
    taskHeight += taskHeight!==undefined ? parseInt(window.getComputedStyle(taskElem).getPropertyValue('margin-top')) : undefined;

    const tabListStyle = {
        overflowY : tabIndex==1 ? "scroll" : "visible",
        maxHeight : taskHeight*6,
    }

    const TasksList = ({list}) => {
        
        return(
            <Grid className='tabList' container sx={tabListStyle}>
                {list.map((task, i)=> {
                    return(
                        <Grid key={i} className='task' sx={styles.taskGrid} container>
                            <Grid xs={8} item>
                                <Grid item sx={styles.name} xs={12}>{task.name}</Grid>
                                {task.description!=="" && <Grid item sx={styles.description} xs={12}>{task.description}</Grid>}
                                {task.description=="" && <Grid item sx={styles.description} xs={12}>No Description</Grid>}
                            </Grid>
                            <Grid xs={4} item sx={{textAlign : "right"}}>
                                <Grid item sx={styles.date} xs={12}>{task.date.toDateString()}</Grid>
                                <Grid item sx={styles.time} xs={12}>{task.time.toLocaleTimeString()}</Grid>
                            </Grid>
                        </Grid>
                    )
                })}
            </Grid>
        )
    }

    return (
        <Grid style={styles.drawer} container>
            <Box xs={12} >
                <Tabs
                    variant="fullWidth" 
                    value={tabIndex} 
                    onChange={handleTabChange}
                >
                    <Tab style={{minWidth : "50%"}} label="Upcoming" />
                    <Tab style={{minWidth : "50%"}} label="All" />
                </Tabs>
                <Divider />
            </Box>
            <TasksList list={(tabIndex==0) ? upcomings : all}/>
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