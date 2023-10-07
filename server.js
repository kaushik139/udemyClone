require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('./config.json');

const studentsRouter = require('./routes/students')
const instructorsRouter = require('./routes/instructor')
const coursesRouter = require('./routes/courses')
const jwtKey = config.jwtKEY;

const app = express()

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true, useUnifiedTopology: true
})
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to Database'));

app.use(express.json())
app.use('/students', studentsRouter)
app.use('/instructors', instructorsRouter)
app.use('/courses', coursesRouter)


app.listen(3000, () => {
    console.log('Listening on Port 3000!');
})