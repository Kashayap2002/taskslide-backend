const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes'); // Import task routes

const app = express();

app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies

// Use task routes at the `/api/tasks` endpoint
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => res.send('TaskSlide API is running')); // Default route

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
