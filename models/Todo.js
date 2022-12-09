/* 
  Title : Todo Model
  Description : Creates a collection named todos that follows todoSchemas
  Author : Aritra Pal
  Date : 09/12/22
*/

//dependencies
const mongoose = require("mongoose");
const todoSchemas = require("../Schemas/todoSchemas")

//make the Todo model
const Todo = mongoose.model('Todo',todoSchemas)

//export
module.exports = Todo