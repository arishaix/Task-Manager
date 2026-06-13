# Task Manager API

A backend API built with Node.js, Express, MongoDB, and JWT authentication. It allows users to register, log in, and manage personal tasks.

## Features

* User authentication (register/login)
* Password hashing with bcrypt
* JWT-based authentication
* Protected task routes
* CRUD operations for tasks
* User-specific task access

## Tech Stack

Node.js, Express, MongoDB, Mongoose, JWT, bcrypt

## API Routes

User:

* POST /api/users/register
* POST /api/users/login

Tasks (protected):

* POST /api/tasks
* GET /api/tasks
* PUT /api/tasks/:taskId
* DELETE /api/tasks/:taskId

## Usage

1. Register and log in
2. Get JWT token
3. Send token in request headers:
   Authorization: Bearer <token>
4. Access task routes

## Note

All task routes require authentication. Users can only access their own tasks.
