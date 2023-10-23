const courses = require('../../../models/courses')
const chalk = require('chalk')

async function controller(req, res) {

    console.log(req.body)
    console.log(req.body.videoTitle)
    console.log(req.body.sectionIndex);
    // console.log(chalk.red(res.courses));
    // console.log(res.courses.sections[req.body.sectionIndex]);

    if (req.body.videoTitle && typeof (req.body.sectionIndex) === 'number') {
        res.courses.sections[req.body.sectionIndex].videos.push({ title: req.body.videoTitle })
        // console.log(chalk.bgBlue(res.courses.sections[req.body.sectionIndex].videos));
    }

    try {
        res.courses.save();
        console.log(chalk.yellowBright(res.courses.sections));
        res.status(200).send({ message: "Course Created!" })
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}

module.exports = { controller }