// const Courses = require('../../models/courses');

async function controller(req, res) {
    try {
        await res.courses.deleteOne();
        res.status(200).json({ message: 'Course Deleted!' })
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = { controller }