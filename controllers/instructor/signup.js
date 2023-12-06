const instructor = require('../../models/instructor')
const chalk = require('chalk')

async function controller(req, res) {
console.log(req.body);

    const newInstructor = new instructor({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    try {
        // console.log(chalk.red.bgYellowBright('data:'));
        // console.log(newInstructor);
        const saveInstructor = await newInstructor.save()
        res.status(201).json({ message: "New Instructor Signup!" })
        console.log(chalk.bgYellowBright.red('success'));
    } catch (err) {
        console.log(chalk.red('failed'));
        res.status(400).json({ message: err.message })
    }
}

module.exports = { controller }