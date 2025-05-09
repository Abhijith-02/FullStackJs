const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv');



dotenv.config();

const app = express();

app.use(cors());
// Connect to Database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/items', require('./routes/items'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
