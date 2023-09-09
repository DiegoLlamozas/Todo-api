const { Task } = require('../models/tasks');
const { User } = require('../../accounts/models/users');
const bcrypt = require('bcryptjs');

const createTask = async (data) => {
    const verifyUser = await User.findByPk(data.userId);

    if (!verifyUser) {
        return { error: 'This user doesnt exist' };
    }

    const task = await Task.create({...data});
    console.log('createTask: Task created:', task);
    
    return task;
}

const getTasks = async () => {
    const tasks = Task.findAll();
    return tasks;
}

const getTasksByUserId = async(userId) => {
    const user = await User.findByPk(userId);

    if (!user) {
        throw { status: 404, message: 'Task not found' };
    }

    const tasks = await Task.findAll({ where: { userId: userId } });

    return tasks;
}

const getTaskByTaskId = async(taskId) => {
    const task = await Task.findByPk(taskId);

    if (!task) {
        throw { status: 404, message: 'Task not found' };
    }

    return task
}

const updateTaskDescription = async(taskId,newDescription) => {
    const task = await Task.findByPk(taskId);

    if (!task) {
        return { error: 'Task not found' };
    }

    task.content = newDescription;
    
    await task.save();

    return { message: `Description changed successfully to ${newDescription}!` };
}

const updateTaskTitle = async(taskId,newTitle) => {
    const task = await Task.findByPk(taskId);

    if (!task) {
        return { error: 'Task not found' };
    }

    task.title = newTitle;

    await task.save();

    return { message: `Description changed successfully to ${newTitle}!` };
}

const completeTask = async(taskId) => {
    const task = await Task.findByPk(taskId);

    if (!task) {
        return { error: 'Task not found' };
    }

    if (task.completed) {
        return { error: 'a completed task cannot be completed again' };
    }

    task.completed = true;
    await task.save()

    const today = new Date();
    task.completitionDate = today;
    await task.save();
}

const deleteTask = async(taskId) => {
    const task = await Task.findByPk(taskId);

    if (!task) {
        return { error: 'Task not found' };
    }

    await task.destroy();

    return { message: 'Task deleted successfully!!!' };
} 

module.exports = {
    createTask,
    getTasks,
    getTasksByUserId,
    getTaskByTaskId,
    updateTaskDescription,
    completeTask,
    deleteTask,
}
