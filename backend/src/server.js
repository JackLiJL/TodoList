const express = require('express');
const cors = require('cors');
const repository = require('./repository/todo');
const todo = require('./repository/todo');
const todoService = require('./service/todo')(repository);

const server = () => {
  const server = express();
  server.use(express.json());
  server.use(cors());

  server.get('/api/todo', async (req, res) => {
    try {
      const todos_tasks = await todoService.getTodos();
      if (!todos_tasks) {
        return res.status(404).json({ error: 'No todos found' });
      }
      res.status(200).json(todos_tasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
    
  });

  server.post('/api/todo', async (req, res) => {
    try {
      const { task } = req.body;

      if (!task) {
        return res.status(400).json({ error: 'Task is empty' });
      }

      const newTodo = await todoService.createTodo(task);
      res.status(200).json(newTodo);

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  /**
  POST /api/todo
  {
   "task": "Some API"
  }

   {
    "todos": [
      {
        "task": "Some API"
      }
    ]
   }
  **/

  return server;
};
module.exports = server;