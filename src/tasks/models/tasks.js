const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const { User } = require('../../accounts/models/users');

const Task = sequelize.define('tasks', {
    title: {
        type: DataTypes.STRING
    },
    content: {
        type: DataTypes.TEXT
    } ,
    completed:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    } , 
    creationDate:{
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW
    }, 
    completitionDate:{
        type: DataTypes.DATEONLY,
        allowNull: true, 
        defaultValue: null 
    },

}

);

Task.belongsTo(User, { foreignKey: 'userId' }); 

module.exports = {
    Task
}