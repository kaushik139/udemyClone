const student = require('../../models/student')
const bcrypt = require('bcrypt');

async function controller(req, res) {
    // const { username, password } = req.body;
    const user = await student.findOne({ email: req.body.email });
    if( user ) passwordMatch = await bcrypt.compare(req.body.password, user.password);
    else res.status(404).json({message: "User not Exists!"})

    // // Create a JWT token with user data
    // const token = jwt.sign({ id: user.id, username: user.username }, secretKey);

    // res.json({ token });   
}

module.exports = { controller }