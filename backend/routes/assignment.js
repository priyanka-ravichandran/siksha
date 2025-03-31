const express = require('express');
const db = require('../db'); // this is the pool now
const router = express.Router();

// Upload Assignment
router.post('/', async (req, res) => {
    const { title, description, file_url, student_id } = req.body;
    const sql = 'INSERT INTO assignments (title, description, file_url, student_id) VALUES (?, ?, ?, ?)';
    try {
        const [result] = await db.query(sql, [title, description, file_url, student_id]);
        res.status(201).json({ message: 'Assignment uploaded successfully', id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get All Assignments
router.get('/', async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM assignments');
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a Single Assignment
router.get('/:id', async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM assignments WHERE id = ?', [req.params.id]);
        res.status(200).json(results[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get assignments by student ID
router.get('/user/:student_id', async (req, res) => {
    const studentId = req.params.student_id;
    const sql = 'SELECT * FROM assignments WHERE student_id = ?';
    try {
        const [results] = await db.query(sql, [studentId]);
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Grade Assignment
router.put('/:id/grade', async (req, res) => {
    const { grade, feedback } = req.body;
    const sql = 'UPDATE assignments SET grade = ?, feedback = ? WHERE id = ?';
    try {
        const [result] = await db.query(sql, [grade, feedback, req.params.id]);
        res.status(200).json({ message: 'Assignment graded successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
