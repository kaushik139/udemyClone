const instructor = require('../../models/instructor');

async function controller(req, res) {
    try {
        await res.instructor.deleteOne();
        res.json({ message: 'Instructor Deleted!' })
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = { controller }