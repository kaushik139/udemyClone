const courses = require('../../../models/courses')
const chalk = require('chalk')

async function controller(req, res) {

    if (req.body.videoTitle && typeof (req.body.sectionIndex) === 'number' && typeof (req.body.videoIndex) === 'number') {
        res.courses.sections[req.body.sectionIndex].videos[req.body.videoIndex].title = req.body.videoTitle;
    }

    if (req.body.videoPath !== undefined && typeof (req.body.sectionIndex) === 'number' && typeof (req.body.videoIndex) === 'number') {
        res.courses.sections[req.body.sectionIndex].videos[req.body.videoIndex].path = req.body.videoPath;
    }

    try {
        res.courses.save();
        res.status(200).send({ message: "Video Updated!" })
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}

module.exports = { controller }