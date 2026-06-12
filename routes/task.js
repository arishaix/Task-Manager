const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task')

router.post('/' , taskController.createTasks );
router.get('/', taskController.getTasks);
router.put('/:taskId', taskController.updateTask);
router.delete('/:taskId', taskController.deleteTask);

module.exports = router