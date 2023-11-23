const Courses = require('../../../models/courses')
const Instructors = require('../../../models/instructor')

async function controller(req, res) {
    // console.log('::');
    try {
        let list = await Instructors.find({
            $expr: {
              $eq: [{ $size: "$courses" }, 0]
            }
        }).lean();     
        
        for (let i = 0; i < list.length; i++){
            list[i].unpublishedCourses = list[i].courses.length;
        }
        
        if (list.length) res.status(200).json(list);
        else res.json('No Data!')
    } catch (err) { console.error(err); res.json('Server Error!') }
}

module.exports = { controller };