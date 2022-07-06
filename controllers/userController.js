//destructring the user models into User and Thought from models
const { User, Thought} = require('../models');

//function to get all the users from mongodb
function getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  };

  //function to get all the users from database
  function getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('thoughts')
      .populate('friends')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  };

  //function to create user 
  function createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  };

  //function to add friends to a user whenever a friend is added 
  function updateUserFriend(req, res) {
        User.findOneAndUpdate(
          {_id: req.params.userId},
          {$push: { "friends": req.params.friendId}},     
          {new: true }, 
          (err, result) => {
            if (result) {
              console.log(`Updated: ${result}`);
              res.json(result);
            } else {
              console.log('Uh Oh, something went wrong');
              res.json(err);
            }
      });
    };

    //Function to update user 
    function updateUser(req, res) {
      // Finding the user by user id
      User.findById(req.params.userId)
      .then((user) => {
        //if user doesnt exist, send an error message back
        if (!user) {
           res.status(404).json({ message: 'No user with that ID' })
        }
        // if the user exists, update the user with request.body
        else {
          for (const key of Object.keys(req.body)) {
            if (key in user) {
              user[key] = req.body[key]; 
            };
          };
          // update the user with the modified user object 
          User.findOneAndReplace(
            {_id: req.params.userId}, 
            user, 
            function (err, user){
              if (err){
                console.log('Uh Oh, something went wrong in update');
                res.json(err);
              }
              else{
                  console.log("updated user: ", user);
                  res.json(user);
              }
          })
         }
        }
      )
      .catch((err) => res.status(500).json(err));
    }


  module.exports = {getUsers, getSingleUser, createUser, updateUserFriend, updateUser}