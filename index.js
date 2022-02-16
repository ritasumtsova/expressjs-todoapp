const express = require('express');
const path = require('path');
const cors = require('cors');
//const fs = require("fs");
const jsonParser = express.json();

const app = express();
const PORT = process.env.PORT || 3000;
//const filePath = "tasks.js";
const tasks = require('./tasks');

// // создаем парсер для данных application/x-www-form-urlencoded
// const urlencodedParser = express.urlencoded({extended: false});

const getTasks = (req, res) => {
  res.status(200).send(tasks);
};

app.get('/api/tasks', getTasks);

const addTask = (req, res) => {
  if(!req.body) return response.sendStatus(400);

  console.log(req.body);

  const task = {
    id: tasks.length + 1, 
    description: req.body.description
  };
  tasks.push(task);
  res.status(201).send(task);
}

app.post('/api/tasks', jsonParser, addTask);

const deleteTask = (req, res) => {
  console.log(req.body)
  const message = {message: 'To do lists was cleared'};
  console.log(message);

  tasks.length = 0; 
  console.log(`tasks is ${tasks}`)

  res.status(200).json(message);
}

app.delete('/api/tasks', deleteTask);

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'src')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'src', 'index.html'))
});

app.listen(PORT, function(){
    console.log(`Server has been started on port ${PORT}...`);
});

module.exports.app = app;
module.exports.getTasks = getTasks;
module.exports.addTask = addTask;
module.exports.deleteTask = deleteTask;