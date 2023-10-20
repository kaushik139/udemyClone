const courses = require('../../models/courses')
const chalk = require('chalk')

async function controller(req, res) {
   
    console.log(req.body)
    console.log(chalk.red(res.courses.sections));
   
    if (req.body.sectionTitle) {
        res.courses.sections.push({ sectionTitle : req.body.sectionTitle })
        console.log('i');
    }
    if (req.body.sectionDescription) {
        res.courses.sections[res.courses.sections.length - 1].sectionDesctiption = req.body.sectionDescription
        console.log('n');
    }
    
    try {
        res.courses.save();
        console.log(chalk.yellowBright(res.courses.sections));
        res.status(200).json({
            message: "Course Updated!", updatedCourse: res.courses})
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}

module.exports = {controller}