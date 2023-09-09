const router = require('express').Router({ mergeParams: true });
const { createTask, getTasks, getTasksByUserId, getTaskByTaskId, updateTaskDescription, completeTask, deleteTask, updateTaskTitle } = require('../controllers/tasks');
const { validate } = require('./../../config/validate');
const { checkSchema } = require('express-validator');
const { tasksSchema, descriptionUpdateSchema, titleUpdateSchema } = require('../schemas/tasks');

// Create task route with validation and controller
router.post('/', validate(checkSchema(tasksSchema)), createTask);

// Get all tasks
router.get('/', getTasks);

// Get tasks by user ID
router.get('/:userId', getTasksByUserId);

// Get task by task ID
router.get('/:taskId', getTaskByTaskId);

// Update task description
router.put('/:taskId/description', validate(checkSchema(descriptionUpdateSchema)), updateTaskDescription);

// Update title description
router.put('/:taskId/title', validate(checkSchema(titleUpdateSchema)),updateTaskTitle );

// Complete task
router.put('/:taskId/complete', completeTask);

// Delete task
router.delete('/:taskId/delete', deleteTask);

module.exports = {
    router,
};

