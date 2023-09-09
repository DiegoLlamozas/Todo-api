const { User } = require('../models/users');
const bcrypt = require('bcryptjs');

const createUser = async (data) => {
    const verifyEmail = await User.findOne({ where: { email: data.email } });
    const verifyUsername = await User.findOne({ where: { username: data.username } });

    if (verifyEmail) {
        return { error: 'Email is already in use' };
    }
    if (verifyUsername) {
        return { error: 'Username is already in use' };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const user = await User.create({ ...data, password: hashedPassword });
    return user;
};

const getUsers = async () => {
    const users = await User.findAll();
    return users;
};

const deleteUser = async (userId) => {
    
    const user = await User.findByPk(userId);

    if (!user) {
        return { error: 'User not found' };
    }

    await user.destroy();

    return { message: 'User deleted successfully' };
};

const getUserById = async (userId) => {
    const user = await User.findByPk(userId);

    if (!user) {
        throw { status: 404, message: 'User not found' };
    }

    return user;
    
};

const updateUsername = async (userId, newUsername) => {
    const user = await User.findByPk(userId);
    const verifyUsername = await User.findOne({
        where: {
            username: newUsername
        }
    });

    if (!user) {
        return { error: 'User not found' };
    }

    if(verifyUsername){
        return { error: 'Username is already in use' };
    }

    user.username = newUsername;
    await user.save();

    return { message: `Username changed successfully to ${newUsername}!` };
    
};

const updatePassword = async (userId, newPassword) => {
    
    const user = await User.findByPk(userId);

    if (!user) {
        return { error: 'User not found' };
    }

    const salt = await bcrypt.genSalt(10);
    const newHashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = newHashedPassword;
    await user.save();

    return { message: `password updated succesfully!` };
    
};

module.exports = {
    createUser,
    getUsers,
    deleteUser,
    updateUsername,
    updatePassword,
    getUserById,
};
