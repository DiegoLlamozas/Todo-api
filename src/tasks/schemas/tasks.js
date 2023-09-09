const tasksSchema = {
    title: {
        notEmpty: true,
        errorMessage: "Title cannot be empty",
        isLength: {
            options: { min: 3 },
            errorMessage: "Title must contain at least 3 characters"
        }
    },
    content: {
        optional: true, // This field is optional, but if present, will be validated
        isLength: {
            options: { max: 5000 }, // Maximum length of 5000 characters
            errorMessage: "Content must not exceed 5000 characters"
        }
    },

    userId: {
        notEmpty: true,
        errorMessage: "userId cannot be empty",
        isInt: {
            errorMessage: "userId must be an integer"
        }
    }
};

const descriptionUpdateSchema = {
    content: {
        isLength: {
            options: { max: 5000 }, // Maximum length of 5000 characters
            errorMessage: "Content must not exceed 5000 characters"
        }
    },
}

const titleUpdateSchema = {
    title: {
        notEmpty: true,
        errorMessage: "Title cannot be empty",
        isLength: {
            options: { min: 3 },
            errorMessage: "Title must contain at least 3 characters"
        }
    },
}

module.exports = { tasksSchema, descriptionUpdateSchema, titleUpdateSchema };
