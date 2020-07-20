const express = require('express');
const app = express();

const { mongoose } = require('./db/mongoose');
const bodyParser = require('body-parser');

//Load in the mongoose models
const { List, Task } = require('./db/models');

// Load middleware
app.use(bodyParser.json());

//Cors Middleware
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

/* ROUTE HANDLERS */

/* LIST ROUTERS */

/** 
 * GET /lists
 * Purpose : get all lists
*/
app.get('/lists', (req, res) => {
    // We want to return an array of all the lists in the database
    List.find().then((lists) => {
        res.send(lists);
    }).catch((e) => {
        res.send(e);
    });
})

/** 
 * POST /lists
 * Purpose : Crea a list
*/
app.post('/lists', (req, res) => {
    //We want to create a new list and return the new list doc back to user(include the id)
    // THe lis information fields will be passed in via the JSON req body
    let title = req.body.title;
    let newList = new List({
        title
    });
    newList.save().then((listDoc) => {
        // the full list document is returned (incl, id)
        res.send(listDoc);
    })
});

/** 
 * PATCH /lists
 * Purpose : Update specified id of list
*/
app.patch('/lists/:id', (req,res) => {
    //We want to update the specified list with new values in specified json body of req
    //
    List.findByIdAndUpdate({ _id: req.params.id }, {
        $set: req.body
    }).then(() => {
        res.sendStatus(200);
    });
});

app.delete('/lists/:id', (req,res) => {
    //Delete specified List
    List.findOneAndRemove({ 
        _id: req.params.id
    }).then((removedListDoc) => {
        res.send(removedListDoc);
    })
})
/** 
 * GET /lists/:listId/tasks
 * Purpose : get all tasks that belong to specific list
*/
app.get('/lists/:listId/tasks', (req,res) => {
   // we want to return all task that belong to specifig list
   Task.find({
       _listId: req.params.listId
   }).then((tasks) => {
       res.send(tasks);
   })
});

/** 
 * POST /lists/:listId/tasks
 * Purpose : Create a task that belong to specific list
*/
app.post('/lists/:listId/tasks', (req,res) => {
    // We want to create a new task in a list specified by ListId
    let newTask = new Task({
        title: req.body.title,
        _listId: req.params.listId
    });
    newTask.save().then((newTaskDoc) => {
        res.send(newTaskDoc);
    })
})
/* GET ONE TASK USING listId and taskId
app.get('/lists/:listId/tasks/:taskId', (req,res) => {
    Task.findOne({
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then((task) => {
        res.send(task);
    })
}) 
*/
/** 
 * POST /lists/:listId/tasks/:taskId
 * Purpose : Update a task that belong to specific list
*/
app.patch('/lists/:listId/tasks/:taskId', (req,res) => {
    //We want to update specisfk task specified by tasId
    Task.findOneAndUpdate({
        _id: req.params.taskId,
        _listId: req.params.listId
    }, {
        $set: req.body
    }).then(() => {
        res.sendStatus(200);
    })
});

app.delete('/lists/:listId/tasks/:taskId', (req,res) => {
    //Delete specific task on specific list
    Task.findOneAndRemove({
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then((removedTaskDoc) => {
        res.send(removedTaskDoc);
    })
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
})