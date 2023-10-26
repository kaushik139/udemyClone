const courses = require('../../../models/courses');
const chalk = require('chalk');

async function controller(req, res) {
    // console.log(req.body.desc);

    try {
        if (req.body.desc) {

            res.courses.description.fullDescription = req.body.desc;

            await res.courses.save();

            res.status(200).json({ message: 'Updated' });
            console.log(chalk.bgWhiteBright('Full Description Updated!'));
        } else {
            return res.status(400).json({ message: 'Missing Fields' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = { controller };
