const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task');
const authMiddleware = require('../middleware/auth');

router.post('/' , authMiddleware.verifyToken, taskController.createTasks );
router.get('/', authMiddleware.verifyToken, taskController.getTasks);
router.put('/:taskId', authMiddleware.verifyToken, taskController.updateTask);
router.delete('/:taskId', authMiddleware.verifyToken,  taskController.deleteTask);

module.exports = router