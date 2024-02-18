const userModel = require('../model/userModel')

const getAllUsers = async () => {
    return await userModel.find();
}

const updateUserActions = async (userID, numOfActions) => {
    await userModel.findOneAndUpdate({id: userID}, {currentActions: numOfActions})
    .then(() => console.log(`UsersRouter: updateUserActions: User id ${userID} current actions was updated`))
    .catch((err) => console.log(`UsersRouter: updateUserActions: Error in updating User id ${userID} actions ${err.message}`))
}

const updateAllUsersActions = () => {
    
}

module.exports = {updateUserActions, updateAllUsersActions, getAllUsers}