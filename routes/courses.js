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
const UpdateAllInOne = require('../controllers/courses/UpdateAllInOne')
const remove = require('../controllers/courses/delete')

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

// Updating Section
router.patch('/updateAll/:id', (req, res, next) => {
  middleware.getItemById(courses, 'courses', req, res, next);
}, UpdateAllInOne.controller)

//Deleting One
router.delete('/:id', (req, res, next) => {
  middleware.getItemById(courses, 'courses', req, res, next);
}, remove.controller)


module.exports = router;