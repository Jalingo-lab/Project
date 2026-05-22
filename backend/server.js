const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const studentRoutes = require('./routes/studentRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/students', studentRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('MongoDB Connected Successfully');

    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
})
.catch((err) => {
    console.log('Database Connection Error:', err);
});
