const { Task } = require('../models/tasks');
const TaskService = require('../services/tasks');
const TaskSupport = require('../supports/tasks');

const createTask = async (req, res) => {
    const task = req.body;

    try {
        const createdTask = await TaskService.createTask(task);

        if (createdTask.error) {
            return res.status(400).send(createdTask);
        }

        const responseTask = await TaskSupport.buildTaskResponse(createdTask);
        
        return res.status(201).send(responseTask);
    } catch (err) {
        console.error('Error creating task:', err);

        if (err.status) {
            return res.status(err.status).json({
                message: err.message,
            });
        }

        return res.status(500).json({
            message: 'Error on server',
        });
    }
};

const updateTaskTitle = async (req, res) => {
    const taskId = req.params.taskId;
    const { title } = req.body; 

    try {
        const updatedTask = await TaskService.updateTaskTitle(taskId, title);
        const updatedTaskInfo = await TaskService.getTaskByTaskId(taskId);
        const updatedTaskResponse = TaskSupport.buildTaskResponse(updatedTaskInfo);
        return res.status(201).send(updatedTaskResponse);
    } catch (err) {
        if (err.status) {
            return res.status(err.status).json({
                message: err.message,
            });
        }
        return res.status(500).json({
            message: 'Error on server',
        });
    }
};



const getTasks = async(req,res) => {
    try {
        const tasks = await UserService.getTasks();

        if (tasks.error) {
            return res.status(400).send(tasks);
        };

        const createdTasks = await UserSupport.buildTasksResponse(tasks);
        return res.status(200).send(createdTasks);
    } catch (err) {
        if (err.status) {
            return res.status(err.status).json({
                message: err.message,
            });
        }
        return res.status(500).json({
            message: 'Error on server',
        });
    }
}     
     
const getTasksByUserId = async(req,res) => {
    const userId = req.params.userId;

    try {
        const tasks = await TaskService.getTasksByUserId(userId);
        const tasksResponse = TaskSupport.buildTasksResponse(tasks);
        return res.status(200).json(tasksResponse);
    } catch (err) {
        if (err.status) {
            return res.status(err.status).json({
                message: err.message,
            });
        }

        return res.status(500).json({
            message: 'Error on server',
        });
    }
}

const getTaskByTaskId = async(req,res) => {
    const taskId = req.params.taskId;

    try {
        const task = await UserService.getTaskByTaskId(taskId);
        const taskResponse = UserSupport.buildTaskResponse(task);
        return res.status(200).json(taskResponse);
    } catch (err) {
        if (err.status) {
            return res.status(err.status).json({
                message: err.message,
            });
        }

        return res.status(500).json({
            message: 'Error on server',
        });
    }
}

const updateTaskDescription = async(req,res) => {
    const taskId = req.params.taskId;
    const { content } = req.content;

    try {
        const updatedTask = await TaskService.updateTaskDescription(taskId, content);
        const updatedTaskInfo = await TaskService.getTaskByTaskId(taskId);
        const updatedTaskResponse = TaskSupport.buildTaskResponse(updatedTaskInfo);
        return res.status(201).send(updatedTaskResponse);
    } catch (err) {
        if (err.status) {
            return res.status(err.status).json({
                message: err.message,
            });
        }
        return res.status(500).json({
            message: 'Error on server',
        });
    };
}



const completeTask = async(req,res) => {
    const taskId = req.params.taskId;
    const { completed } = req.completed;

    try {
        const updatedTask = await TaskService.completeTask(taskId);
        const updatedTaskInfo = await TaskService.getTaskByTaskId(taskId);
        const updatedTaskResponse = TaskSupport.buildTaskResponse(updatedTaskInfo);
        return res.status(201).send(updatedTaskResponse);
    } catch (err) {
        if (err.status) {
            return res.status(err.status).json({
                message: err.message,
            });
        }
        return res.status(500).json({
            message: 'Error on server',
        });
    };
}

const deleteTask = async(req,res) => {
    const taskId = req.params.taskId;
    
    try {
        const response = await UserService.deleteUser(taskId);

        if (response.error) {
            return res.status(400).send(response);
        }

        return res.status(204).send();
    } catch (err) {
        if (err.status) {
            return res.status(err.status).json({
                message: err.message,
            });
        }

        return res.status(500).json({
            message: 'Error on server',
        });
    }
} 


module.exports = {
    createTask,
    getTasks,
    getTasksByUserId,
    getTaskByTaskId,
    updateTaskDescription,
    updateTaskTitle,
    completeTask,
    deleteTask,
} 