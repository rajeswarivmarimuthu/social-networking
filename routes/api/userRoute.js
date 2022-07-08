//importing router function from express 
const router = require('express').Router();

//importing get users and create user function from controller library
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  updateUserFriend,
  deleteUser,
  deleteFriend,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser);


// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(updateUserFriend).delete(deleteFriend);

// /api/users/:userId
router.route('/:userId').put(updateUser);

module.exports = router;
