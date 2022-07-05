const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText:{
            type: String,
            required: true,
            maxlength: 280,
            minlength: 2,
        },
        createdAt:{
            type: Date,
            default: Date.now,
        },
        username:{
            type: Schema.Types.ObjectId,
            ref: 'user',
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
          getters: true,
        },
        id: false,
      },
);

thoughtSchema.virtual('reactionsCount').get( function(){
    return this.reactions.length;
})


const Thought = model('Thought', thoughtSchema);
module.exports = Thought;