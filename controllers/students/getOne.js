const students = require('../../models/student')
const instructors = require('../../models/instructor')

async function controller(req, res) {
    console.log(req.params.email);
    console.log(req.body.role);

    if (req.body.role && req.params.email) {
        
        try {
            let user = {};
            if (req.body.role === 'students') user = await students.findOne({ email: req.params.email });
            if (req.body.role === 'instructors') user = await instructors.findOne({ email: req.params.email });
    
            // console.log(user);
            res.status(200).json({ user });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    else res.status(404).json('Missing Data!')
}

module.exports = {controller}