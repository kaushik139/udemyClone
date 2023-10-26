const Courses = require('../../../models/courses')

async function controller(req, res) {
    try {
        const courses = await Courses.find()
        res.json(courses)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
module.exports = { controller }

