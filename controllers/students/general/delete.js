// const student = require('../../models/student');

async function controller(req, res) {
    try {
        await res.student.deleteOne();
        res.json({ message: 'Student Deleted!' })
        // console.log("controller");
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = { controller }