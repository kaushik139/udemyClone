const chalk = require('chalk');

async function controller(req, res) {

    console.log(chalk.red(req.body.index));
    console.log(chalk.red(';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;'));
    
    try {
        await res.courses.sections.splice(req.body.index, 1);
        await res.courses.save();
        res.status(200).json({ message: 'Section Deleted!' })
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = { controller }