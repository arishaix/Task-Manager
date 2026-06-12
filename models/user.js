const express = require('express');
const mongoose = require('mongoose');
const {Schema} = mongoose

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    email: {
        required: true,
        unique: true,
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    tasks:[{
        type: Schema.Types.ObjectId, ref: 'Task'
    }]
})
const User = mongoose.model('User', userSchema)
module.exports = User