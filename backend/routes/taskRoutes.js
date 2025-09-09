const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController.js');
const { protect } = require('../middleware/authMiddleware.js');

// Rute Tasks
router.get('/', protect, taskController.getAllTasks);
router.post('/', protect, taskController.createTask);
router.put('/:id', protect, taskController.updateTask);
router.delete('/:id', protect, taskController.deleteTask);

module.exports = router;