/* 
  Title : todoSchemas
  Description : Schema details of the todo collection
  Author : Aritra Pal
  Date : 09/12/22
*/

//dependencies
const mongoose = require("mongoose");

//defining the schema of todo collection
const todoSchemas = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  status: {
    type: String,
    required: true,
    enum: ["active", "inactive"],
    default: "active",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

//export
module.exports = todoSchemas;
