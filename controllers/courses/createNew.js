const course = require('../../models/courses')

async function controller(req, res) {
    const newCourse = new course({
        title: req.body.title,
        description: req.body.description,
        instructor: req.body.instructor,
        category: req.body.category,
        price: req.body.price
    })
    try {
        const saveCourse = await newCourse.save()
        res.status(201).json(saveCourse)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

module.exports = {controller}