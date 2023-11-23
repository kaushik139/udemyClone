const Courses = require('../../../models/courses')
const Instructors = require('../../../models/instructor')

async function controller(req, res) {
    // console.log('::');
    try {
      let list = await Instructors.find().lean();
      
        const courses = await Courses.find();

        for (let i = 0; i < list.length; i++){
            const x =  courses.filter((course) => JSON.stringify(course.instructor) == JSON.stringify(list[i]._id) && course.status === "published");
            const y = courses.filter((course) => JSON.stringify(course.instructor) === JSON.stringify(list[i]._id) && course.status !== "published");

            list[i].unpublishedCourses = y.length;
            list[i].publishedCourses = x.length;
        }
          
        if (list.length) res.status(200).json(list);
        else res.json('No Data!')
    } catch (err) { console.error(err); res.json('Server Error!') }
}

module.exports = { controller };