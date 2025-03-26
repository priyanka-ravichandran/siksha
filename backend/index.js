const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./db');
const assignmentRoutes = require('./routes/assignment');
const gcsRoutes = require("./routes/gcs");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// API Routes
app.use('/api/assignments', assignmentRoutes);
app.use('/api/gcs', gcsRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Assignment service running on port ${PORT}`));