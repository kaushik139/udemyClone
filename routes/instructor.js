const express = require('express')
const router = express.Router()
const instructor = require('../models/instructor')

const getAll = require('../controllers/instructor/getAll')
const getOne = require('../controllers/instructor/getOne')
const create = require('../controllers/instructor/createNew')
const update = require('../controllers/instructor/update')
const remove = require('../controllers/instructor/delete')
const signup = require('../controllers/instructor/signup')
const login = require('../controllers/instructor/login')

const AllMyCourses = require('../controllers/instructor/allMyCourses')

const middleware = require('./middlewares')

//Getting All
router.get('/', getAll.controller)

// Getting One
router.get('/:id',(req, res, next) => {
    middleware.getItemById(instructor, 'instructor', req, res, next);
}, getOne.controller)
  
//Getting One by email
// router.post('/:email', getOne.controller);

//Creating One
router.post('/', create.controller)

// Updating one
router.patch('/:id',(req, res, next) => {
    middleware.getItemById(instructor, 'instructor', req, res, next);
  }, update.controller)

//Deleting One
router.delete('/:id', (req, res, next) => {
    middleware.getItemById(instructor, 'instructor', req, res, next);
  }, remove.controller)

//SignUp
router.post('/newSignup', (req, res, next) => {
    middleware.checkEmail(instructor, req, res, next); 
}, signup.controller);

//Login
router.post('/login', login.controller)

//to get all courses by an instructor
router.get('/allMyCourses/:email', AllMyCourses.controller);


module.exports = router