const express = require('express');
const mongoose = require('mongoose');

const student = require('./schema/student');
const instructor = require('./schema/instructor');
const course = require('./schema/courses');

const app = express()

try{mongoose.connect("mongodb://localhost/test2db", {
    useNewUrlParser: true, useUnifiedTopology: true
},
console.log('Connection Successsful!')
)
}
catch {
    (err) => {
         console.log(err);
    }
}



app.listen(3000, () => {
    console.log('Listening on Port 3000!');
})