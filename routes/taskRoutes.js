const express = require('express');
const db = require('../config/db'); // Import the database connection
const authenticate = require('../middleware/authMiddleware'); // Middleware for authentication

const router = express.Router();

// Add a new task
router.post('/', authenticate, async (req, res) => {
    const { title, time } = req.body;
    console.log('Task data received:', { title, time, user_id: req.user.id }); // Debug log

    try {
        await db.query('INSERT INTO tasks (title, time, user_id) VALUES (?, ?, ?)', [
            title,
            time,
            req.user.id,
        ]);
        console.log('Task added successfully');
        res.status(201).send('Task created');
    } catch (err) {
        console.error('Error adding task:', err.message); // Log error details
        res.status(500).send('Failed to add task'); // Send error message to client
    }
});

// Get all tasks for the logged-in user
router.get('/', authenticate, async (req, res) => {
    try {
        console.log('Fetching tasks for user ID:', req.user.id); // Debug log

        const [tasks] = await db.query('SELECT * FROM tasks WHERE user_id = ?', [req.user.id]);
        console.log('Tasks fetched successfully:', tasks); // Debug log
        res.json(tasks); // Send tasks as JSON response
    } catch (err) {
        console.error('Error fetching tasks:', err.message); // Log error details
        res.status(500).send('Failed to fetch tasks'); // Send error message to client
    }
});

// Mark a task as done
router.patch('/:id', authenticate, async (req, res) => {
    const taskId = req.params.id;
    try {
        console.log('Marking task as done for ID:', taskId); // Debug log
        const [result] = await db.query(
            'UPDATE tasks SET status = "done" WHERE id = ? AND user_id = ?',
            [taskId, req.user.id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).send('Task not found or not authorized');
        }
        console.log('Task marked as done');
        res.status(200).send('Task marked as done');
    } catch (err) {
        console.error('Error marking task as done:', err.message); // Log error
        res.status(500).send('Failed to mark task as done');
    }
});


// Delete a task
router.delete('/:id', authenticate, async (req, res) => {
    const taskId = req.params.id;
    try {
        console.log('Deleting task with ID:', taskId); // Debug log
        const [result] = await db.query('DELETE FROM tasks WHERE id = ? AND user_id = ?', [
            taskId,
            req.user.id,
        ]);
        if (result.affectedRows === 0) {
            return res.status(404).send('Task not found or not authorized to delete');
        }
        console.log('Task deleted successfully');
        res.status(200).send('Task deleted');
    } catch (err) {
        console.error('Error deleting task:', err.message); // Log error details
        res.status(500).send('Failed to delete task'); // Send error message to client
    }
});

module.exports = router;
