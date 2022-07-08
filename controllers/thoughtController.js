const BSON = require('bson');

//destructring the thought model into Thought from models
const { User, Thought } = require('../models');

//function to get all the thoughts from mongodb
function getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  };

  //function to get a thoughts from database
  function getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  };

  //function to create thought 
  function createThought(req, res) {
    Thought.create(req.body)
      .then((dbThoughtData) => {
        User.findOneAndUpdate(
        {_id: req.body.userId},
        { $push: { "thoughts": dbThoughtData._id}},     
        {new: true },
        (err, result) => {
          if (result) {
            console.log(`Thought is updated in: ${req.body.userId}`);
          } else {
            console.log('Uh Oh, something went wrong');
          }
        })
        res.json(dbThoughtData)})
      .catch((err) => res.status(500).json(err));
  };


  //function to update a thought that is already posted
  function updateThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) => {
        if (!thought) {
          res.status.json({ message: 'No thought with that ID' })
        }
        else {
          Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$set:{"thoughtText": req.body.thoughtText}}, 
            {new:true},
            function (err, result){
              if (err){
                console.log('Uh Oh, something went wrong in update', err);
                res.json(err);
              }
              else{
                  console.log("updated thought: ", req.params.thoughtId);
                  res.json(result);
              }
            }
          )
        }
      })
      .catch((err) => res.status(500).json(err));
  }

  //Delete a thought by thoughtId 
  function deleteThought(req, res) {
    Thought.findByIdAndDelete(req.params.thoughtId)
    .then((dbThoughtData) => res.json(dbThoughtData))
    .catch((err) => res.json(err))
  }

  // add reaction to a thought
  function addReaction(req,res){
      Thought.findOneAndUpdate(
        {_id: req.params.thoughtId},
        {$push: { "reactions": req.body}},     
        {new: true }, 
        (err, result) => {
          if (result) {
            console.log(`added reaction to: ${req.params.thoughtId}`);
            res.json(result);
          } else {
            console.log('Uh Oh, something went wrong');
            res.json(err);
          }
    });
  };

  // Function to delete a reaction 
  function deleteReaction (req,res) {
    Thought.findOneAndUpdate(
      {_id: req.params.thoughtId},
      {$pull: { "reactions": {reactionId : req.params.reactionId}}},     
      {new: true }, 
      (err, result) => {
        if (result) {
          console.log(`Reaction removed from thought: ${req.params.thoughtId}`);
          res.json(result);
        } else {
          console.log('Uh Oh, something went wrong');
          res.json(err);
        }
      }
   );
  };

  module.exports = {getThoughts, getSingleThought, createThought,updateThought,deleteThought, addReaction, deleteReaction}