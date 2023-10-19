require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const chalk = require('chalk')

const studentsRouter = require('./routes/students')
const instructorsRouter = require('./routes/instructor')
const coursesRouter = require('./routes/courses')

const app = express()

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true, useUnifiedTopology: true
})
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to Database'));

app.use(express.json())
app.use(cors())
app.use('/students', studentsRouter)
app.use('/instructors', instructorsRouter)
app.use('/courses', coursesRouter)
app.use('/images', express.static('public/Images'));

app.listen(process.env.port, () => {
    console.log(chalk.red.bgYellowBright('Listening on Port 3000!' + Date().slice(15, 25)));
})

