const courses = require('../../models/courses')
const chalk = require('chalk')

async function controller(req, res) {

    console.log(chalk.red('LandingPage: '));
    console.log(req.body);
    
    if (req.body.fullDescription !== null) {
        res.courses.description.fullDescription = req.body.fullDescription
   
        try {
            res.courses.save();
            res.status(200).json({ message: "Landing Page Created!" })
            console.log(chalk.bgWhiteBright('Landing Page Created!'));
            // console.log(courses);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }
    else return res.status(400).json({ message: 'Missing Fields' });

}

module.exports = {controller}