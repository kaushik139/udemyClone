// const Courses = require('../../models/courses');
const chalk = require('chalk');

async function controller(req, res) {

    console.log(chalk.red(req.body.index));
    
    try {
        await res.courses.sections.splice(req.body.index, 1);
        await res.courses.save();
        res.json({ message: 'Section Deleted!' })
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = { controller }