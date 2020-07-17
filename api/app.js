const express = require('express');
const app = express();

const { mongoose } = require('./db/mongoose');
const bodyParser = require('body-parser');

//Load in the mongoose models
const { List, Task } = require('./db/models');

// Load middleware
app.use(bodyParser.json());

/* ROUTE HANDLERS */

/* LIST ROUTERS */

/** 
 * GET /lists
 * Purpose : get all lists
*/
app.get('/lists', (req, res) => {
    // We want to return an array of all the lists in the database
    List.find({}).then(() => {
        res.send(lists);
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
})

app.delete('/lists/:id', (req,res) => {
    //Delete specified List
})

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
})