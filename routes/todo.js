var express = require('express');
var router = express.Router();
var Todo = require('../model/tododata');
const mesg = require('../module/message');

router.post('/addTodo', function(req,res, next){
   
    const newTodo = new Todo({
        complete: "false",
        title: req.body.data.title,
        date: req.body.data.date,
        content: req.body.data.todo,
    })
    newTodo.save()
    .then((createdUser) => {
        res.status(200).json(mesg.todo.success);
    })
    .catch((err) => {
        res.status(500).json(mesg.dbError)
    })
})

router.get('/getTodo', function(req,res, next){
    Todo.find()
    .sort({date:1})
    .select({title:1, date:1, content:1, complete:1})
    .then((todoo) => {
        res.status(200).json(todoo)
      
    })
    .catch((error) => {
        console.log("error occurs")
        console.log(error)
    })
})

router.post('/editdateTodo', function(req,res, next){
    
    Todo.updateOne({ _id: req.body.id},{
        "date" : req.body.date,
    })
    .then((todoo) => {
        res.status(200).json(mesg.todo.edited)
        console.log(res)
    })
    .catch((error) => {
        console.log("error occurs")
        console.log(error)
    })

})


router.post('/edittaskTodo', function(req,res, next){
    Todo.updateOne({ _id: req.body.id},{
        "content" : req.body.todo,
    })
    .then((todoo) => {
        res.status(200).json(mesg.todo.edited)
    })
    .catch((error) => {
        console.log("error occurs")
        console.log(error)
    })
})


router.post('/setComplete', function(req,res, next){

    Todo.updateOne({ _id: req.body.id},{
        "complete" : "true",
        })
    .then((todoo) => {
        res.status(200).json(mesg.todo.edited)
    })
    .catch((error) => {
        console.log("error occurs")
        console.log(error)
    })
})


router.post('/toDelete', function(req,res, next){
    
    Todo.remove({ _id: req.body.id})
    .then((todoo) => {
        res.status(200).json(mesg.todo.edited)
    })
    .catch((error) => {
        console.log("error occurs")
        console.log(error)
    })
})

module.exports = router;