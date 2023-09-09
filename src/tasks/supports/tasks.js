const buildTaskResponse = (task) => {
    const taskResponse = { 
        id: task.id,
        user: task.userId,
        title: task.title,
        content: task.content,
        completed: task.completed,
        creationDate: task.creationDate,
        completitionDate: task.completitionDate,     
    };
    return userResponse ;
}

const buildTasksResponse = (tasks) => {
    const mappedTasks = tasks.map(task => {
        const createdTask = buildTaskResponse(tasks);
        return createdTask;
    });
    return mappedTasks;
}

module.exports = {
    buildTaskResponse,
    buildTasksResponse
}