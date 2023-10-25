const courses = require('../../models/courses');
const chalk = require('chalk');

async function controller(req, res) {
    try {
        // console.log(res.courses);

            if (req.file) {
                // console.log(req.file.path);
                // console.log(req.file.filename);
                res.courses.images.bgImage = req.file.filename; 
            }

            await res.courses.save();

            res.status(200).json({ message: 'Updated', path: req.file.filename});
            console.log(chalk.bgWhiteBright('BgImage Updated!'));
            
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
}

module.exports = { controller };
