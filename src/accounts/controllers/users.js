const { User } = require('../models/users');
const UserService = require('../services/users');
const UserSupport = require('../supports/users');

const createUser = async (req, res) => {
    const userData = req.body; 
    try {
        const createdUser = await UserService.createUser(userData);
        if (createdUser.error) {
            return res.status(400).send(createdUser);
        }
        const createdUserResponse = UserSupport.buildUserResponse(createdUser);
        return res.status(201).send(createdUserResponse);
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


const getUsers = async (req, res) => {
    try {
        const users = await UserService.getUsers();

        if (users.error) {
            return res.status(400).send(users);
        };

        const createdUsers = await UserSupport.buildUsersResponse(users);
        return res.status(200).send(createdUsers);
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

const deleteUser = async (req, res) => {
    const userId = req.params.id;
    
    try {
        const response = await UserService.deleteUser(userId);

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
};

const updateUsername = async (req, res) => {
 
    const userId = req.params.id;
    const { username } = req.body;

    try {
        const updatedUser = await UserService.updateUsername(userId, username);
        if (updatedUser.error) {
            return res.status(400).send(updatedUser);
        }
        const updatedUserInfo = await UserService.getUserById(userId);
        const updatedUserResponse = UserSupport.buildUserResponse(updatedUserInfo);
        return res.status(201).send(updatedUserResponse);
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
};

const getUserById = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await UserService.getUserById(userId);
        const userResponse = UserSupport.buildUserResponse(user);
        return res.status(200).json(userResponse);
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

const updatePassword = async (req, res) => {
 
    const userId = req.params.id;
    const { password } = req.body;

    try {
        const updatedUser = await UserService.updatePassword(userId, password);
        if (updatedUser.error) {
            return res.status(400).send(updatedUser);
        }
        const updatedUserInfo = await UserService.getUserById(userId);
        const updatedUserResponse = UserSupport.buildUserResponse(updatedUserInfo);
        return res.status(201).send(updatedUserResponse);
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
};


module.exports = {
    createUser,
    getUsers,
    deleteUser,
    updateUsername,
    updatePassword,
    getUserById
};
