// const courses = require('../../models/courses');
const chalk = require('chalk');

async function controller(req, res) {
    // console.log(req.file.path);
    console.log(req.file.filename);
    // console.log(req.file);
    // console.log(req.body);
    console.log(';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;');
    console.log(req.body.exerciseIndex);

    try {
        if (req.file.filename) {
            res.status(200).json({ message: 'Added Exercise File', path: req.file.filename});
            console.log(chalk.whiteBright('Exercise File Added!'));
        }

    } catch (err) {
        console.warn(err);
        return res.status(500).json({ message: err.message });
    }
}

module.exports = { controller };
