const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => console.log('MongoDB connected'));

// Import routes
const jobRoutes = require('./routes/jobRoutes');
app.use('/api/jobs', jobRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
