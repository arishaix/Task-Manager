const express = require('express');
const Task = require('../models/task');

exports.createTasks = async(req, res) => {
    try{
    const {title,description} = req.body
    const userId = req.user.userId
    if(!title || !userId){
          return res.status(400).json({message: 'Incomplete data'})
    }
    const task = new Task({title: title, description: description, user: userId })
    await task.save()
    return res.status(201).json({message: 'Task created'})
    }catch(error){
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.getTasks = async(req, res) => {
    try{
    const userId = req.user.userId
    if(!userId){
        return res.status(400).json({message: 'Incomplete data'})
    }
    const tasks = await Task.find({user: userId})
    return res.status(200).json({data: tasks})
}catch(error){
    return res.status(500).json({ message: 'Internal Server Error' });
}
}

exports.updateTask = async(req,res) => {
    try{
    const { taskId} = req.params;
    const userId = req.user.userId
    const {title , description, completed} = req.body
    const task = await Task.findById(taskId);
    if(!task){
        return res.status(404).json({message: 'Task not found'})
    }
    if(task.user.toString() == userId){
        const updatedTask = await Task.findByIdAndUpdate(taskId,{
            title: title, 
            description: description,
            completed: completed },
            {new: true}
        )
        return res.status(200).json({data: updatedTask})
    }else{
        return res.status(403).json({message: 'Unauthorized'})
    }} catch(error){
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.deleteTask = async(req, res) => {
    try{
    const {taskId} = req.params
     const userId = req.user.userId

    const task = await Task.findById(taskId);
    if(!task){
        return res.status(404).json({message: 'Task not found'})
    }
    if(task.user.toString() == userId){
        const deletedTask = await Task.findByIdAndDelete(taskId)
        return res.status(200).json({data: deletedTask})
    }else{
        return res.status(403).json({message: 'Unauthorized'})
    }
    }catch(error){
        return res.status(500).json({ message: 'Internal Server Error' });
    }

}