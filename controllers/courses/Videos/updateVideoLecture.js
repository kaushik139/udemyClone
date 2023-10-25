const courses = require('../../../models/courses')
const chalk = require('chalk')

async function controller(req, res) {

    // console.log(req.body)
    // console.log(req.body.videoTitle)
    // console.log(req.body.sectionIndex);
    // console.log(req.body.videoIndex);
    // console.log(chalk.red(res.courses));
    // console.log(res.courses.sections[req.body.sectionIndex]);


    if (req.body.videoTitle && typeof (req.body.sectionIndex) === 'number' && typeof (req.body.videoIndex) === 'number') {
        res.courses.sections[req.body.sectionIndex].videos[req.body.videoIndex].title = req.body.videoTitle;
        // console.log(chalk.bgBlue(res.courses.sections[req.body.sectionIndex]));
        // console.log(chalk.yellowBright(res.courses.sections[req.body.sectionIndex].videos[req.body.videoIndex].title));
    }

    try {
        res.courses.save();
        // console.log(chalk.yellowBright(res.courses.sections));
        res.status(200).send({ message: "Video Updated!" })
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}

module.exports = { controller }