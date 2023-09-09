const usersSchema = {
    email: {
        notEmpty: true,
        errorMessage: "email cannot be empty"
    },
    password: {
        notEmpty: true,
        errorMessage: "password cannot be empty",
        isLength: {
            options: { min: 6 },
            errorMessage: "password must contain at least 6 characters"
        },
    },
    username: {
        notEmpty: true,
        errorMessage: "username cannot be empty"
    },

}

const updateUsernameSchema = {
    username: {
        notEmpty: true,
        errorMessage: 'Username cannot be empty'
    }
};

const updatePasswordSchema = {
    password: {
        notEmpty: true,
        errorMessage: 'Password cannot be empty',
        isLength: {
            options: { min: 6 },
            errorMessage: "password must contain at least 6 characters"
        },
    }
};

module.exports = { usersSchema, updateUsernameSchema, updatePasswordSchema }