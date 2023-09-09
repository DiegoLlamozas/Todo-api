const router = require('express').Router({ mergeParams: true });
const { createUser, getUsers, deleteUser, updateUsername, updatePassword, getUserById } = require('../controllers/users'); 
const { validate } = require('./../../config/validate');
const { checkSchema } = require('express-validator');
const { usersSchema, updateUsernameSchema, updatePasswordSchema } = require('../schemas/users');

// Create user route with validation and controller
router.post('/', validate(checkSchema(usersSchema)), createUser);

// Create a new route to get users
router.get('/', getUsers); 

// Create a new route to get a single user by their id
router.get('/:id', getUserById);

// Delete user's accounts
router.delete('/:id/delete', deleteUser);

// Update username
router.put('/:id/username',validate(checkSchema(updateUsernameSchema)),updateUsername);

// Update password
router.put('/:id/password', validate(checkSchema(updatePasswordSchema)),updatePassword);

module.exports = {
    router,
};
