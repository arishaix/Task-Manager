const express = require('express');
const mongoose = require('mongoose');
const {Schema} = mongoose;

const taskSchema = new Schema({
    title:{
        required: true,
        type: String,
    },
    description:{
        type: String,

    },
    completed:{
        default: false,
        type: Boolean,
    },
    user:{
        type: Schema.Types.ObjectId, ref: 'User'
    }
    
})

const Task = mongoose.model( 'Task' , taskSchema );
module.exports = Task;