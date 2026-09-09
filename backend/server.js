const dns=require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
require('dotenv').config();

const app = express();

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

// start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}
);