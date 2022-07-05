//importing necessary functions from external package mongoose
const { Schema, model } = require('mongoose');

// User schema an enabling virtuals
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            match: /.+\@.+\..+/,
            unique: true  
        },
        thoughts: [
            {
             type: Schema.Types.ObjectId,
             ref: 'Thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User', 
            }
        ],
    },
    {
    toJSON: {
        virtuals: true,
      },
      id: false,
    },
);

//virtual field friendsCounts to keep track of total number of friends
userSchema.virtual('friendsCount').get( function(){
    return this.friends.length;
})

//Creating user model 
const User = model('User', userSchema);
module.exports = User;