/* 
  Title : todoHandler
  Description : Handler to handle all routes that comes on /todo
  Author : Aritra Pal
  Date : 08/12/22
*/

//dependencies
const express = require('express');
const Todo = require('../models/Todo')

//router for /todo
const router = express.Router()

//Handle all Routes

//GET ALL TODO
router.get('/',async(req,res)=>{
  //use find()
  await Todo.find({status:'active'},(err,result) =>{
    if (err) {
      res.status(500).send({ error: err });
    } else {
      res.status(200).send({ result,message: "Todo inserted Successfully" });
    }
  }).clone();
})

//GET A PARTICULAR TODO BY ID
router.get('/:id',async(req,res)=>{
  //use find()
  await Todo.find({ _id:req.params.id }, (err, result) => {
    if (err) {
      res.status(500).send({ error: err });
    } else {
      res.status(200).send({ result, message: "Todo inserted Successfully" });
    }
  }).clone();
})

//POST A TODO
router.post('/',async(req,res)=>{
  //create newTodo obj by send data to save
  const newTodo = new Todo(req.body);
  await newTodo.save((err)=>{
    if (err){
      res.status(500).send({error:err})
    } else {
      res.status(200).send({message:"Todo inserted Successfully"})
    }
  })
})

//POST MULTIPLE TODO
router.post('/all',async(req,res)=>{
  //save the array of todos using inertMany
  Todo.insertMany(req.body,err => {
    if (err) {
      res.status(500).send({ error: err });
    } else {
      res.status(200).send({ message: "Todos were inserted Successfully" });
    }
  })
})

//PUT(EDIT) A PARTICULAR TODO
router.put('/:id',async(req,res)=>{
  //Todo.updateOne
  /* await Todo.updateOne(
    {_id:req.params.id},
    {
      $set:{
        status : 'inactive',
      }
    },
    err=>{
      if (err) {
        res.status(500).send({ error: err });
      } else {
        res.status(200).send({ message: "Todo updated Successfully" });
      }
    }
  ).clone() */
  //if we want the result of the updated data
  const result = await Todo.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        status: "inactive",
      },
    },
    {
      useFindAndModify:false,
      new:true,
    },
    (err) => {
      if (err) {
        res.status(500).send({ error: err });
      } else {
        res.status(200).send({ message: "Todo updated Successfully" });
      }
    }
  ).clone();
  console.log(result);
})

//DELETE A PARTICULAR TODO BY ID
router.delete('/:id',async(req,res)=>{
  //use deleteOne
  await Todo.deleteOne(
    {_id:req.params.id},
    err=>{
      if (err) {
        res.status(500).send({ error: err });
      } else {
        res.status(200).send({ message: "Todo Deleted Successfully" });
      }
    }
  ).clone()
})

//exporting the router
module.exports = router;
