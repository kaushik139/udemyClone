const express = require('express')
const router = express.Router()
const courses = require('../models/courses')

const getAll = require('../controllers/courses/getAll')
const getOne = require('../controllers/courses/getOne')
const create = require('../controllers/courses/createNew')
const update = require('../controllers/courses/update')
const updatePricing = require('../controllers/courses/updatePricing')
const landingPage = require('../controllers/courses/landingPage')
const bgImage = require('../controllers/courses/bgImage')
const CreateSection = require('../controllers/courses/Section/CreateSection')
const UpdateSection = require('../controllers/courses/Section/UpdateSection')
const createVideoLecture = require('../controllers/courses/Videos/createVideoLecture')
const updateVideoLecture = require('../controllers/courses/Videos/updateVideoLecture')
const videoUpload = require('../controllers/courses/Videos/videoUpload')
const remove = require('../controllers/courses/delete')
const removeSection = require('../controllers/courses/Section/deleteSection')
const removeVideoLecture = require('../controllers/courses/Videos/deleteVideo')


const middleware = require('./middlewares')

//Getting All
router.get('/', getAll.controller)

//Getting One
router.get('/:id', (req, res, next) => {
  middleware.getItemById(courses, 'courses', req, res, next);
}, getOne.controller);

//Creating One
router.post('/', create.controller)

// Updating one
router.patch('/:id', (req, res, next) => {
  middleware.getItemById(courses, 'courses', req, res, next);
}, update.controller)

//update pricing
router.patch('/pricing/:id', (req, res, next) => {
  middleware.getItemById(courses, 'courses', req, res, next);
}, updatePricing.controller)

//creating Landing Page
router.patch('/landingPage/:id', (req, res, next) => {
  middleware.getItemById(courses, 'courses', req, res, next);
}, landingPage.controller);

//uploading Landing Page BGimage
router.patch('/landingPageImage/:id', middleware.upload.single('fileInput'), (req, res, next) => {
  middleware.getItemById(courses, 'courses', req, res, next);
}, bgImage.controller);

// creating Section
router.patch('/CreateSection/:id', (req, res, next) => {
  middleware.getItemById(courses, 'courses', req, res, next);
}, CreateSection.controller)

// creating videoLecture
router.patch('/createVideoLecture/:id', (req, res, next) => {
  middleware.getItemById(courses, 'courses', req, res, next);
}, createVideoLecture.controller)

// update videoLecture
router.patch('/updateVideoLecture/:id', (req, res, next) => {
  middleware.getItemById(courses, 'courses', req, res, next);
}, updateVideoLecture.controller)

//uploading Lecture Video
router.patch('/videoUpload/:id', middleware.upload2.single('fileInput'), (req, res, next) => {
  middleware.getItemById(courses, 'courses', req, res, next);
}, videoUpload.controller);

// Updating Section
router.patch('/UpdateSection/:id', (req, res, next) => {
  middleware.getItemById(courses, 'courses', req, res, next);
}, UpdateSection.controller)

//Deleting One
router.delete('/:id', (req, res, next) => {
  middleware.getItemById(courses, 'courses', req, res, next);
}, remove.controller)

//Deleting Section
router.delete('/deleteSection/:id', (req, res, next) => {
  middleware.getItemById(courses, 'courses', req, res, next);
}, removeSection.controller)

//Deleting Video Lecture
router.delete('/deleteVideoLecture/:id', (req, res, next) => {
  middleware.getItemById(courses, 'courses', req, res, next);
}, removeVideoLecture.controller)


module.exports = router;