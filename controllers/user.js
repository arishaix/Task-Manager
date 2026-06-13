const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

exports.registerUser = async( req, res) => {
    try{
        const {username , email , password}= req.body;

        if (!username || !email || !password){
            return res.status(400).json({message: 'Incomplete data'})
        }

        const duplicateUser = await User.findOne({$or: [
            { username: username },
            { email: email } ]
        })

        if(duplicateUser){
            return res.status(409).json({message: 'User already exists'})
        }

        const hashedpass = await  bcrypt.hash(password , saltRounds)

        const newUser = new User({username: username, email: email, password: hashedpass})
        await newUser.save();

        return res.status(201).json({message: 'User created'})

    }catch(error){
        return res.status(500).json({message: 'Internal Server Error.'});
    }
}

exports.loginUser = async(req, res) => {
    try{
        const {username,email, password} = req.body;

        if ( !username||!email || !password){
            return res.status(400).json({message: 'Incomplete data'})
        }
        const foundUser = await User.findOne({ username, email})
        if(!foundUser){
            return res.status(404).json({message: 'User doesnt exists'})
        }else{
            const match = await bcrypt.compare(password, foundUser.password);
            if(match){
                const token = jwt.sign({userId: foundUser._id },
                              jwtSecret,
                              {expiresIn: '1d'})
                return res.status(200).json({message: 'Login successful', token: token})
            }else{
                return res.status(401).json({message: 'Invalid credentials'})
            }
        }


    }catch(error){
        return res.status(500).json({message: 'Internal Server Error.'});

    }

}