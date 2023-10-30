const courses = require('../../models/courses')
const instructor = require('../../models/instructor')

async function controller(req, res) {
    // console.log(res.instructors);
    // console.log(req.params.email);

    if (req.params.email) {
        try {
            const user = await instructor.findOne({ email: req.params.email })
            // console.log(user._id);

            const myCourses = await courses.find({ instructor: user._id })
            // console.log(typeof(myCourses));

            res.status(202).json(myCourses);

        } catch (err) {
            console.error(err);
            res.status(404).json(err);
        }
    }
    else {
        console.error('Missing ID');
        res.status(404).json('Missing ID');
    }
}

module.exports = { controller }