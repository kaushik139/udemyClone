// const courses = require('../../models/courses');
const chalk = require('chalk');

async function controller(req, res) {
    // console.log(req.file.path);
    // console.log(req.file.filename);
    // console.log(req.file);
    // console.log(req.body.sectionIndex);
    // console.log(req.body.videoIndex);

    try {
        if (req.file.filename) {
            res.status(200).json({ message: 'Added Video File', path: req.file.filename});
            console.log(chalk.whiteBright('Video File Added!'));
        }

    } catch (err) {
        console.warn(err);
        return res.status(500).json({ message: err.message });
    }
}

module.exports = { controller };
