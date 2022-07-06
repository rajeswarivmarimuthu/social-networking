//importing router function from express 
const router = require('express').Router();

//importing get users and create user function from controller library
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  updateUserFriend,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser);


// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(updateUserFriend);

// /api/users/:userId
router.route('/:userId').put(updateUser);

module.exports = router;
