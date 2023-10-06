const instructor = require('../../models/instructor')

async function create(req, res) {
    const newInstructor = new instructor({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    try {
        const saveInstructor = await newInstructor.save()
        res.status(201).json(saveInstructor)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

module.exports = {create}