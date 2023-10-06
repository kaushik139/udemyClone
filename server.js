require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');

const studentsRouter = require('./routes/students')
const instructorsRouter = require('./routes/instructor')


// const config = require('./config.json')
// const student = require('./models/student');
// const instructor = require('./models/instructor');
// const course = require('./models/courses');

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


app.listen(3000, () => {
    console.log('Listening on Port 3000!');
})