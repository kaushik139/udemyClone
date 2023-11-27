const Courses = require('../../../models/courses');

async function controller(req, res) {
    console.log(req.params.id);
    if (req.params.id) {
        try {
            const course = await Courses.findOne({ _id: req.params.id });
            course.status = 'published';
            course.save();
            res.status(200).json('Published!')
        }catch(err){console.log(err);}
    }
}

module.exports = {controller}