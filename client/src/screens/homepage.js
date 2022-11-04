import React from 'react'
import { useState, useEffect } from 'react';
import Drawer from '../components/drawer';
import Form from '../components/form';
import { Grid } from '@mui/material';

const Homepage = () => {

    useEffect(()=> {

    }, []);

    return (
        <Grid container style={styles.homepage}>
            <Grid item md={8} xs={12} lg={9}>
                <Form />
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
                <Drawer />
            </Grid>
        </Grid>
    );
}

const styles = {

}
 
export default Homepage;