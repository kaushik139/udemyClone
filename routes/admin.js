const express = require('express')
const router = express.Router()



const PublishedCourses = require('../controllers/admin/courses/publishedCourses')
const UnpublishedCourses = require('../controllers/admin/courses/unpublishedCourses')
const AllCourses = require('../controllers/admin/courses/allCourses')

const PCInstructors = require('../controllers/admin/instructors/pcInstructors')
const UPCInstructors = require('../controllers/admin/instructors/upcInstructors')
const AllInstructors = require('../controllers/admin/instructors/allInstructors')

const PCStudents = require('../controllers/admin/students/pcStudents')
const UPCStudents = require('../controllers/admin/students/upcStudents')
const AllStudents = require('../controllers/admin/students/allStudents')




// published courses for admin
router.get('/getPublishedCourses', PublishedCourses.controller)

// unpublished courses for admin
router.get('/getUnpublishedCourses', UnpublishedCourses.controller)

// All courses for admin
router.get('/getAllCourses', AllCourses.controller)

/////////////////////////////////////////////////////INSTRUCTORS////////////////////////////////////////////////

// Instructors with published Courses for admin
router.get('/getPcInstructors', PCInstructors.controller)

// Instructors with published Courses for admin
router.get('/getUpcInstructors', UPCInstructors.controller)

// Instructors with published Courses for admin
router.get('/getAllInstructors', AllInstructors.controller)

///////////////////////////////////////////////////Students/////////////////////////////////////////////////////

// Students with purchased Courses for admin
router.get('/getPcStudents', PCStudents.controller)

// Students with unpurchased Courses for admin
router.get('/getUpcStudents', UPCStudents.controller)

// All Students for admin
router.get('/getAllStudents', AllStudents.controller)

module.exports = router;