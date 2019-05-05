
const mongoose = require('mongoose');
const Schema = mongoose.Schema
const InfoSchema = new Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true
    }

}, { _id: false });
const CommentSchema = new Schema({
    member: {
        type: InfoSchema
    },
    content: String,
    rating: {
        type: Number,
        enum: [1, 2, 3, 4, 5]
    },
    numberOfRatings: {
        type: Number
    },
    reviewer: [mongoose.Schema.Types.ObjectId]
})
const ReactSchema = new Schema({
    member: {
        type: InfoSchema
    },
    rating: {
        type: Number,
        enum: [0,1, 2, 3, 4, 5]
    }
}, { _id: false })

// Create the schema
const PostSchema = new Schema({
    content: {
        type: String
    },
    uplaodDate: {
        type: Date,
        default: Date.now
    },
    applyingMemberId: {
        type: mongoose.Schema.Types.ObjectId
    },
    comments: {
        type: [CommentSchema]
    },
    reacts:[ReactSchema]
})
const Post = mongoose.model('posts', PostSchema)

module.exports = Post




