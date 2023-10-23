const courses = require('../../../models/courses')
const chalk = require('chalk')

async function controller(req, res) {

    console.log(req.body)
    console.log(chalk.bgBlueBright(req.body.index))
    console.log(chalk.red(res.courses.sections[req.body.index]));

    if (req.body.sectionTitle) {
        res.courses.sections[req.body.index].sectionTitle = req.body.sectionTitle;
    }
    if (req.body.sectionDescription) {
        res.courses.sections[req.body.index].sectionDesctiption = req.body.sectionDescription
    }

    try {
        res.courses.save();
        console.log(chalk.yellowBright(res.courses.sections));
        res.status(200).json({
            message: "Course Updated!", updatedCourse: res.courses
        })
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}

module.exports = { controller }