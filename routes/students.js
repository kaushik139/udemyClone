const express = require('express')
const router = express.Router()
const student = require('../models/student')
const middleware = require('./middlewares')

const getAll = require('../controllers/students/general/getAll')
const getOne = require('../controllers/students/general/getOne')
const create = require('../controllers/students/general/createNew')
const update = require('../controllers/students/general/update')
const remove = require('../controllers/students/general/delete')
const signup = require('../controllers/students/general/signup')
const login = require('../controllers/students/general/login')

//view courses
const showAllCourses = require('../controllers/students/viewCourses/showAllCourses')
const showMyCourses = require('../controllers/students/viewCourses/showMyCourses')

const CheckItem = require('../controllers/students/checkBox/checkItem')
const Purchase = require('../controllers/students/payment/purchase')



//Getting All
router.get('/', getAll.controller)

//Login
router.post('/login', login.controller)

//SignUp
router.post('/newSignup', (req, res, next) => {
    middleware.checkEmail(student, req, res, next);
}, signup.controller);

// Purchasing course
router.post('/purchase/:id', (req, res, next) => {
    middleware.getItemById(student, 'student', req, res, next);
}, Purchase.controller)

//Getting One
router.post('/:email', getOne.controller);

//Creating One
router.post('/', create.controller)

// Updating one
router.patch('/:id', middleware.upload.single('fileInput'), (req, res, next) => {
    middleware.getItemById(student, 'student', req, res, next);
}, update.controller);

//Deleting One
router.delete('/:id', (req, res, next) => {
    middleware.getItemById(student, 'student', req, res, next);
}, remove.controller);


//Show all courses
router.get('/showAllCourses/:page', showAllCourses.controller);

//Show my courses
router.get('/showMyCourses/:email', showMyCourses.controller);






module.exports = router 