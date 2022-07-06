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
              if (key == 'username') {
                // update the user with the modified user object 
                User.findOneAndUpdate(
                  {_id: req.params.userId}, 
                  {$set:{"username": req.body.username}},
                  function (err, result){
                    if (err){
                      console.log('Uh Oh, something went wrong in update', err);
                       set_username = false;
                    }
                    else{
                        console.log("updated user: ", result);
                        set_username = true;
                    }
                })
              } else if (key == 'email') {
                    User.findOneAndUpdate(
                      {_id: req.params.userId}, 
                      {$set:{"email": req.body.email}},
                      function (err, result){
                        if (err){
                          console.log('Uh Oh, something went wrong in update', err);
                          set_email = false;
                        }
                        else{
                            console.log("updated user: ", result);
                            set_email = true;
                        }
                    });
              }
              else {
                res.json('You can only update username and email;')
              }
            };
          }; 
        }
        if ( set_username || set_email) {
          res.json(user);
        }
      })
      .catch((err) => res.status(500).json(err));
    }

    //Function to delete user and the thoughts they posted

    function deleteUser (req, res) {
      if (req.params.userId) {
        User.findByIdAndDelete(req.params.userId)
        .then((user) => {
          Thought.deleteMany({username: user.username})
          .then ((thoughts) => {
            console.log ('Deleted all related thoughts', thoughts);
          })
          res.json(user);
        })
        .catch((err) => res.status(500).json(err));
      }
    }

    //Function to delete friends from friends list of a user

  // function deleteFriend (req, res) {

  // }

  module.exports = {getUsers, getSingleUser, createUser, updateUserFriend, updateUser, deleteUser}