const express = require('express')
const router = express.Router()
const courses = require('../models/courses')
const middleware = require('./middlewares')

const getAll = require('../controllers/courses/general/getAll')
const getOne = require('../controllers/courses/general/getOne')
const create = require('../controllers/courses/general/createNew')
const update = require('../controllers/courses/general/update')
const updatePricing = require('../controllers/courses/general/updatePricing')
const landingPage = require('../controllers/courses/general/landingPage')
const bgImage = require('../controllers/courses/general/bgImage')
const remove = require('../controllers/courses/general/delete')

const CreateSection = require('../controllers/courses/Section/CreateSection')
const UpdateSection = require('../controllers/courses/Section/UpdateSection')
const removeSection = require('../controllers/courses/Section/deleteSection')

const createVideoLecture = require('../controllers/courses/Videos/createVideoLecture')
const updateVideoLecture = require('../controllers/courses/Videos/updateVideoLecture')
const removeVideoLecture = require('../controllers/courses/Videos/deleteVideo')
const getCurrentVideo = require('../controllers/courses/Videos/getCurrentVideo')

const videoUpload = require('../controllers/courses/Videos/videoUpload')
const videoEdit = require('../controllers/courses/Videos/videoEdit')

const createExercise = require('../controllers/courses/Exercises/createExercise')
const UpdateExercise = require('../controllers/courses/Exercises/updateExercise')
const removeExercise = require('../controllers/courses/Exercises/deleteExercise')



//Getting All
router.get('/', getAll.controller)

//Getting Video File for current video lecture
router.get('/getCurrentVideo/:path', getCurrentVideo.controller)

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

// creating videoLecture (video name, video path)
router.patch('/createVideoLecture/:id', (req, res, next) => {
  middleware.getItemById(courses, 'courses', req, res, next);
}, createVideoLecture.controller)

// creating new Exercise
router.patch('/createExercise/:id', (req, res, next) => {
  middleware.getItemById(courses, 'courses', req, res, next);
}, createExercise.controller)

// edit Exercise
router.patch('/UpdateExercise/:id', (req, res, next) => {
  middleware.getItemById(courses, 'courses', req, res, next);
}, UpdateExercise.controller)

// update videoLecture (video name, video path)
router.patch('/updateVideoLecture/:id', (req, res, next) => {
  middleware.getItemById(courses, 'courses', req, res, next);
}, updateVideoLecture.controller)

//uploading Lecture's Video file
router.patch('/videoUpload/:id', middleware.upload2.single('fileInput'), (req, res, next) => {
  middleware.getItemById(courses, 'courses', req, res, next);
}, videoUpload.controller);



//editing Lecture's Video file
router.patch('/videoEdit/:id', middleware.upload2.single('fileInput'), (req, res, next) => {
  middleware.getItemById(courses, 'courses', req, res, next);
}, videoEdit.controller);

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

//Deleting Exercise
router.delete('/deleteExercise/:id', (req, res, next) => {
  middleware.getItemById(courses, 'courses', req, res, next);
}, removeExercise.controller)


module.exports = router;