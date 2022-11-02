const express = require('express');
const router = express.Router();

router.get('/upcoming-tasks', async (req,res)=> {
    
});

router.get('/all-tasks', async (req,res)=> {

});

router.post('/new-task', async (req,res)=> {
    const {name, description, date, time} = req.body;

});


module.exports = router;