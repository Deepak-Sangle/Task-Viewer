const express = require('express');
const router = express.Router();
const Task = require('../models/task');

const MAXIMUM_UPCOMING_TASKS = 3;

router.get('/upcoming-tasks', async (req,res)=> {
    const tasks = await Task.find({}).sort({date : 1});
    const date = new Date();
    var i = 0;
    const filteredTasks = tasks.filter((task)=> {
        if(i<3 && date.getTime() <= task.date) {
            i++;
            return task;
        }
    })
    res.send(filteredTasks);
});

router.get('/all-tasks', async (req,res)=> {
    const task = await Task.find({}).sort({date : 1});
    res.send(task);
});

router.post('/new-task', async (req,res)=> {
    const {name, description, date} = req.body;
    const task = new Task({name, description, date});
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