const student = require('../../../models/student')

async function controller(req, res) {
    try {
        const students = await student.find()
        res.json(students)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
module.exports = { controller }

