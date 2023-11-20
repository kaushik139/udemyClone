const student = require('../../../models/student')

async function controller(req, res) {
    const newStudent = new student({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    try {
        const saveStudent = await newStudent.save()
        res.status(201).json(saveStudent)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

module.exports = {controller}