const courses = require('../../../models/courses')
const chalk = require('chalk')

async function controller(req, res) {

    // console.log(req.body)
    // console.log(req.body.videoTitle)
    // console.log(req.body.sectionIndex);
    // console.log(chalk.red(res.courses));
    // console.log(res.courses.sections[req.body.sectionIndex]);

    if (req.body.videoTitle && typeof (req.body.sectionIndex) === 'number' && typeof(req.body.videoPath)) {
        res.courses.sections[req.body.sectionIndex].videos.push({ title: req.body.videoTitle, path: req.body.videoPath});
    }

    try {
        res.courses.save();
        res.status(200).send({ message: "Video Created!" })
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}

module.exports = { controller }