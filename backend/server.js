const dns=require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const adminRoutes = require('./routes/admin');
require('dotenv').config();

const app = express();
//Enable CORS for all routes
const allowedOrigins = [' http://localhost:5173', 'https://task-managenment-application.onrender.com/'];

// middleware
app.use(cors());
app.use(express.json());

// connect to MongoDB
mongoose.connect(process.env.MONGO_URL,)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log(err));

// routes
app.get('/', (req, res) => {
    res.send('Task Management API is running...');
}
);

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/admin', adminRoutes);

// start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}
);
