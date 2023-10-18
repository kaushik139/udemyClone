const instructor = require('../../models/instructor')
const bcrypt = require('bcrypt');
const config = require('../../config.json')
const jwt = require('jsonwebtoken');
const chalk = require('chalk')

async function controller(req, res) {
    console.log(chalk.green.bgBlackBright('Login Triggered!'));
    const user = await instructor.findOne({ email: req.body.email });
    if (user) {
        passwordMatch = await bcrypt.compare(req.body.password, user.password);

        if (passwordMatch) {
            const token = jwt.sign({ id: user.id, username: user.name }, config.jwtKEY);
            
            console.log(chalk.yellowBright("Token: " + token));
            console.log(chalk.yellowBright("Name: " + user.name));
            res.status(202).json({ token: token , name: user.name});
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


// const instructor = require('../../models/instructor')
// const bcrypt = require('bcrypt');
// const config = require('../../config.json')
// const jwt = require('jsonwebtoken');

// async function controller(req, res) {
//     const user = await instructor.findOne({ email: req.body.email });
//     if (user) {
//         passwordMatch = await bcrypt.compare(req.body.password, user.password);

//             const token = jwt.sign({ id: user.id, username: user.name }, config.jwtKEY);
//             res.status(202).json({ token });   

//     }
//     else res.status(404).json({ message: "User not Exists!" })

// }

// module.exports = { controller }