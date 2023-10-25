const courses = require('../../models/courses')
const chalk = require('chalk')

async function controller(req, res) {
   
    // console.log(req.body)
    // console.log(chalk.red(res.courses));
   

    if (req.body.title !== null) {
        res.courses.title = req.body.title
    }
    if (req.body.category !== null) {
        res.courses.category = req.body.category
    }
    try {
        res.courses.save();
        res.status(200).json({
            message: "Course Updated!", updatedCourse: res.courses})
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}

module.exports = {controller}