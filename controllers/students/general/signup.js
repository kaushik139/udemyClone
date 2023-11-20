const student = require('../../../models/student')
const chalk = require('chalk')

async function controller(req, res) {
    const newStudent = new student({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    // console.log(chalk.bgYellowBright.red('data:'));
    // console.log(newStudent);
    try {
        const saveStudent = await newStudent.save()
        res.status(201).json(saveStudent + { message: "New Student Signup!" })
        console.log(chalk.bgRed.yellowBright('Registered!'));
        console.log(saveStudent);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

module.exports = { controller }