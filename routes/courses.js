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
const RequestPublish = require('../controllers/courses/general/requestPublish')

const CreateSection = require('../controllers/courses/Section/CreateSection')
const UpdateSection = require('../controllers/courses/Section/UpdateSection')
const removeSection = require('../controllers/courses/Section/deleteSection')

const createVideoLecture = require('../controllers/courses/Videos/createVideoLecture')
const updateVideoLecture = require('../controllers/courses/Videos/updateVideoLecture')
const removeVideoLecture = require('../controllers/courses/Videos/deleteVideo')
const getCurrentVideo = require('../controllers/courses/Videos/getCurrentVideo')

const videoUpload = require('../controllers/courses/Videos/videoUpload')
const videoEdit = require('../controllers/courses/Videos/videoEdit')
const exerciseUpload = require('../controllers/courses/Exercises/fileUpload')
// const exerciseEdit = require('../controllers/courses/Videos/exerciseEdit')

const createExercise = require('../controllers/courses/Exercises/createExercise')
const UpdateExercise = require('../controllers/courses/Exercises/updateExercise')
const removeExercise = require('../controllers/courses/Exercises/deleteExercise')

const ShowCourseInstructor = require('../controllers/courses/general/showCoursesInstructor')

const PostQnA = require('../controllers/courses/QNA/postQNA')
const GetQNA = require('../controllers/courses/QNA/getQNA')
const DeleteQNA = require('../controllers/courses/QNA/deleteQNA')
const EditQNA = require('../controllers/courses/QNA/editPost')
const ReplyQNA = require('../controllers/courses/QNA/replyQNA')
const EditQnaReply = require('../controllers/courses/QNA/editQnaReply')
const DeleteQnaReply = require('../controllers/courses/QNA/deleteQnaReply')

const CreateNote = require('../controllers/courses/Notes/createNote')
const ShowNotes = require('../controllers/courses/Notes/showNotes')
const EditNotes = require('../controllers/courses/Notes/editNote')
const DeleteNotes = require('../controllers/courses/Notes/deleteNote')

const SubmitRating = require('../controllers/courses/Ratings/submitRating')
const ShowRating = require('../controllers/courses/Ratings/showRating')

const SearchItem = require('../controllers/courses/Searching/search')


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

//Requesting Course Publish
router.patch('/requestPublish/:id', (req, res, next)=> {
  middleware.getItemById(courses, 'courses', req, res, next);
}, RequestPublish.controller)

//uploading BGimage for Landing Page
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

//uploading Exercise file
router.patch('/exerciseUpload/:id', middleware.upload3.single('fileInput'), (req, res, next) => {
  middleware.getItemById(courses, 'courses', req, res, next);
}, exerciseUpload.controller);

//editing Exercise file
// router.patch('/exerciseEdit/:id', middleware.upload2.single('fileInput'), (req, res, next) => {
//   middleware.getItemById(courses, 'courses', req, res, next);
// }, exerciseEdit.controller);

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

//Show All Courses, or filter by instructor
router.get('/showCourses/:email', ShowCourseInstructor.controller)

// Create New QnA
router.post('/postQnA/:id', (req, res, next) => {
  middleware.getItemById(courses, 'courses', req, res, next);
}, PostQnA.controller)

//get QNA
router.post('/getQNA', GetQNA.controller)

// Reply QNA post
router.post('/replyQNA/:id', (req, res, next) => {
  middleware.getItemById(courses, 'courses', req, res, next);
}, ReplyQNA.controller)

// Edit QNA Reply 
router.post('/editQnaReply/:id', (req, res, next) => {
  middleware.getItemById(courses, 'courses', req, res, next);
}, EditQnaReply.controller)

// Delete QNA Reply 
router.post('/deleteQnaReply/:id', (req, res, next) => {
  middleware.getItemById(courses, 'courses', req, res, next);
}, DeleteQnaReply.controller)

// Delete QNA post
router.delete('/removeQNA/:id', (req, res, next) => {
  middleware.getItemById(courses, 'courses', req, res, next);
}, DeleteQNA.controller)

// Edit QNA post
router.post('/editQNA/:id', (req, res, next) => {
  middleware.getItemById(courses, 'courses', req, res, next);
}, EditQNA.controller)

// create Note
router.post('/newNote/:id', (req, res, next) => {
  middleware.getItemById(courses, 'courses', req, res, next);
}, CreateNote.controller)

// Show Notes
router.post('/getNotes/:id', (req, res, next) => {
  middleware.getItemById(courses, 'courses', req, res, next);
}, ShowNotes.controller)

// Edit Notes
router.post('/editNotes/:id', (req, res, next) => {
  middleware.getItemById(courses, 'courses', req, res, next);
}, EditNotes.controller)

// Delete Notes
router.post('/deleteNotes/:id', (req, res, next) => {
  middleware.getItemById(courses, 'courses', req, res, next);
}, DeleteNotes.controller)

// Submit Rating
router.post('/submitRating/:id', (req, res, next) => {
  middleware.getItemById(courses, 'courses', req, res, next);
}, SubmitRating.controller)

// Show Rating
router.post('/showRating/:id', (req, res, next) => {
  middleware.getItemById(courses, 'courses', req, res, next);
}, ShowRating.controller)

// Search a term
router.get('/search/:text', SearchItem.controller)

module.exports = router;