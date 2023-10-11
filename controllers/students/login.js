const student = require('../../models/student')
const bcrypt = require('bcrypt');
const config = require('../../config.json')
const jwt = require('jsonwebtoken');
const chalk = require('chalk')

async function controller(req, res) {
    console.log(chalk.green.bgBlackBright('Login Triggered!'));
    const user = await student.findOne({ email: req.body.email });
    if (user) {
        passwordMatch = await bcrypt.compare(req.body.password, user.password);

        if (passwordMatch) {
            const token = jwt.sign({ id: user.id, username: user.name }, config.jwtKEY);
            
            console.log(chalk.yellowBright("Token: " + token));
            res.status(202).json({ token: token });
        }
        else {
            res.status(401).json({ message: "Password Incorrect" })
            console.log(chalk.red("Password Incorrect"));
        }
    }
    else {
        res.status(404).json({ message: "User not Exists!" })
        console.log(chalk.red('User not Exists!'));
    }

}

module.exports = { controller }