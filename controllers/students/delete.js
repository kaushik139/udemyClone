const student = require('../../models/student');

async function remove(req, res) {
    try {
        await res.student.deleteOne();
        res.json({ message: 'Student Deleted!' })
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = { remove }