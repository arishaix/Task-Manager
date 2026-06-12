const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const connection = require('./config/db');
const userRoutes = require('./routes/user');
const taskRoutes = require('./routes/task');

const app = express();
app.use(express.json())
const port = 3000

app.get('/' , (req, res)=> {
    res.send('Hello!')
})
app.use('/api/users' , userRoutes)
app.use('/api/tasks', taskRoutes)

async function startServer(){
    try{
        await connection();
        console.log('mongodb connected ')
        app.listen(port , ()=>{
            console.log('App is running on port 3k')
        })
    } catch(error){
        console.log(error)
    }

}

startServer();