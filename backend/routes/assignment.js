const express = require('express');
const db = require('../db');
const router = express.Router();

// Upload Assignment
router.post('/', (req, res) => {
    const { title, description, file_url, student_id } = req.body;
    const sql = 'INSERT INTO assignments (title, description, file_url, student_id) VALUES (?, ?, ?, ?)';
    db.query(sql, [title, description, file_url, student_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Assignment uploaded successfully', id: result.insertId });
    });
});

// Get All Assignments
router.get('/', (req, res) => {
    db.query('SELECT * FROM assignments', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
});

// Get a Single Assignment
router.get('/:id', (req, res) => {
    db.query('SELECT * FROM assignments WHERE id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results[0]);
    });
});

// Grade Assignment
router.put('/:id/grade', (req, res) => {
    const { grade, feedback } = req.body;
    const sql = 'UPDATE assignments SET grade = ?, feedback = ? WHERE id = ?';
    db.query(sql, [grade, feedback, req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Assignment graded successfully' });
    });
});

module.exports = router;