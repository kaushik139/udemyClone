const express = require('express')
const router = express.Router()
const student = require('../models/student')

const getAll = require('../controllers/students/getAll')
const getOne = require('../controllers/students/getOne')
const create = require('../controllers/students/createNew')
const update = require('../controllers/students/update')
const remove = require('../controllers/students/delete')

//Getting All
router.get('/', getAll.getAll)

//Getting One
router.get('/:id', getStudent, getOne.getOne);

//Creating One
router.post('/', create.create)

// Updating one
router.patch('/:id', getStudent, update.update)

//Deleting One
router.delete('/:id', getStudent, remove.remove)

//middleWare
async function getStudent(req, res, next) {
    let findStudent;
    try {
        findStudent = await student.findById(req.params.id)
        if (findStudent === null) {
            return res.status(404).json({ message: 'Student not Found!' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.student = findStudent;
    next();
}

module.exports = router 