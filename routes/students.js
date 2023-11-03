const express = require('express')
const router = express.Router()
const student = require('../models/student')
const middleware = require('./middlewares')

const getAll = require('../controllers/students/getAll')
const getOne = require('../controllers/students/getOne')
const create = require('../controllers/students/createNew')
const update = require('../controllers/students/update')
const remove = require('../controllers/students/delete')
const signup = require('../controllers/students/signup')
const login = require('../controllers/students/login')

//view courses
const showAllCourses = require('../controllers/students/viewCourses/showAllCourses')
const showMyCourses = require('../controllers/students/viewCourses/showMyCourses')

//Getting All
router.get('/', getAll.controller)

//Login
router.post('/login', login.controller)

//Getting One
router.post('/:email', getOne.controller);

//Creating One
router.post('/', create.controller)

// Updating one
router.patch('/:id', (req, res, next) => {
    middleware.getItemById(student, 'student', req, res, next);
}, update.controller);

//Deleting One
router.delete('/:id', (req, res, next) => {
    middleware.getItemById(student, 'student', req, res, next);
}, remove.controller);

//SignUp
router.post('/newSignup', (req, res, next) => {
    middleware.checkEmail(student, req, res, next);
}, signup.controller);

//Show all courses
router.get('/showAllCourses/:page', showAllCourses.controller)

//Show my courses
router.get('/showMyCourses/:email', showMyCourses.controller)


module.exports = router 