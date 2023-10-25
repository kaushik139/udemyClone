// const Courses = require('../../models/courses');
const chalk = require('chalk');

async function controller(req, res) {

    // console.log(chalk.red(req.body.sectionIndex));
    // console.log(chalk.red(req.body.videoIndex));
    // console.log(chalk.yellowBright(res.courses.sections[req.body.sectionIndex].videos[req.body.videoIndex]));
    
    try {
        await res.courses.sections[req.body.sectionIndex].videos.splice(req.body.videoIndex, 1);
        await res.courses.save();
        res.json({ message: 'Video Lecture Deleted!' })
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = { controller }