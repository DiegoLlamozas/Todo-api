const buildUserResponse = (user) => {
    const userResponse = { 
        id: user.id,
        email: user.email,
        username: user.username     
    };
    return userResponse ;
};

const buildUsersResponse = (users) => {
    const mappedUsers = users.map(user => {
        const createdUser = buildUserResponse(user);
        return createdUser;
    });
    return mappedUsers ;
}

module.exports = {
    buildUserResponse,
    buildUsersResponse
}