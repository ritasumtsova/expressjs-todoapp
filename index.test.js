const request = require('supertest');
const express = require('express');
const fs = require("fs");
const path = require('path');
const assert = require('assert').strict;

const tasks = require('./tasks');
const app = require('./index').app;
const getTasks = require('./index').getTasks;
const addTask = require('./index').addTask;
const deleteTask = require('./index').deleteTask;

it('should return index.html file', done => {
  request(app)
  .get('/')
  .expect(fs.readFileSync(path.resolve(__dirname, 'src', 'index.html'), 'utf-8')).end(done);
});
app.get('/user', function(req, res) {
  res.status(200).json({ name: 'john' });
});

it('should return all tasks in a DB', done => {
  request(getTasks)
  .get('api/tasks')
  .expect('Content-Type', /json/)
  .expect(200)
  .end(async (err, response) => {
    if (err) throw err;
    assert.deepStrictEqual(await response.body, tasks);
  }, done());
});

it('should return a new tasks', done => {
  request(addTask)
  .get('api/tasks')
  .expect('Content-Type', /json/)
  .expect(201)
  .end(async (err, response) => {
    if (err) throw err;
    assert.deepStrictEqual(await response.body, tasks[tasks.length - 1]);
  }, done());
});

it('should return a message that tasks list was cleared', done => {
  request(deleteTask)
  .get('api/tasks')
  .expect('Content-Type', /json/)
  .expect(200)
  .end(async (err, response) => {
    if (err) throw err;
    assert.deepStrictEqual(await response.body);
  }, done());
});