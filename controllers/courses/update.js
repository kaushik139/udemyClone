const courses = require('../../models/courses')

async function controller(req, res) {
    if (req.body.name !== null) {
        res.course.title = req.body.title
    }
    if (req.body.description !== null) {
        res.course.description = req.body.description
    }
    if (req.body.category !== null) {
        res.course.category = req.body.category
    }
    if (req.body.price !== null) {
        res.course.price = req.body.price
    }
    try {
        res.course.save();
        res.status(200).json({
            message: "Course Updated!"})
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}

module.exports = {controller}