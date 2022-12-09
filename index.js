/* 
  Title : Index
  Description : Entry point of todo api (starts server,connects with db and handles error)
  Author : Aritra Pal
  Date : 08/12/22
*/

//dependencies
const express = require("express");
const mongoose = require("mongoose");
const todoHandler = require('./routeHandler/todoHandler');

mongoose.set("strictQuery", false);

//make app object
const app = express();

//use express.json to get parse request body in json
app.use(express.json());

//connection to db
mongoose
  .connect("mongodb://127.0.0.1/todos", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection successfull"))
  .catch((err) => console.log(err));

//application routes
app.use("/todo", todoHandler);

//custom error handler
app.use((err, req, res, next) => {
  //if error is from async operation send to default error handler to handle
  if (res.headersSent) {
    next(err); //send to the default error handler
  } else {
    res.status(500).send({ Error: err });
  }
});

//start the server and listen to 3000 port
app.listen(3000, (req, res) => {
  console.log("Listening on Port 3000");
});
