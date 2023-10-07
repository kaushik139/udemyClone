const student = require('../../models/student')

async function controller(req, res) {
    if (req.body.name !== null) {
        res.student.name = req.body.name
    }
    if (req.body.email !== null) {
        res.student.email = req.body.email
    }
    try {
        res.student.save();
        res.status(200).json({
            message: "Student Updated!"})
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}

module.exports = {controller}