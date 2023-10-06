const express = require('express')
const router = express.Router()
const instructor = require('../models/instructor')

const getAll = require('../controllers/instructor/getAll')
const getOne = require('../controllers/instructor/getOne')
const create = require('../controllers/instructor/createNew')
const update = require('../controllers/instructor/update')
const remove = require('../controllers/instructor/delete')

//Getting All
router.get('/', getAll.getAll)

//Getting One
router.get('/:id', getInstructor, getOne.getOne);

//Creating One
router.post('/', create.create)

// Updating one
router.patch('/:id', getInstructor, update.update)

//Deleting One
router.delete('/:id', getInstructor, remove.remove)


//middleWare
async function getInstructor(req, res, next) {
    let findInstructor;
    try {
        findInstructor = await instructor.findById(req.params.id)
        if (findInstructor === null) {
            return res.status(404).json({ message: 'Instructor not Found!' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.instructor = findInstructor;
    next();
}


module.exports = router