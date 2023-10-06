const instructor = require('../../models/instructor')

async function update(req, res) {
    if (req.body.name !== null) {
        res.instructor.name = req.body.name
    }
    if (req.body.email !== null) {
        res.instructor.email = req.body.email
    }
    try {
        res.instructor.save();
        res.status(200).json({
            message: "Instructor Updated!"})
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}

module.exports = {update}