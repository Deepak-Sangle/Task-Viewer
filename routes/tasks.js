const express = require('express');
const router = express.Router();
const Task = require('../models/task');

router.get('/upcoming-tasks', async (req,res)=> {
    
});

router.get('/all-tasks', async (req,res)=> {

});

router.post('/new-task', async (req,res)=> {
    const {name, description, date, time} = req.body;
    const task = new Task({name, description, date, time});
    task.save()
        .then((result)=> {
            console.log("Saved: ", result);
            res.send({success : true});
        })
        .catch((err)=> {
            console.log("Error ", err)
            res.send({success : false});
        });
});


module.exports = router;