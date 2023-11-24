const Courses = require('../../models/courses')
const Students = require('../../models/student')
const Instructors = require('../../models/instructor')


async function controller(req, res) {
    // console.log('Overview');
    let data = {};
    try {
        const courses = await Courses.find();
        const counterA = courses.filter((course => course.status === "published" ));
        const counterB = courses.filter((course => course.status !== 'published' ));
        const counterZ = courses.filter((course => course.status === 'requested' ));

        data.totalCourses = courses.length;
        data.publishedCourses = counterA.length;
        data.unpublishedCourses = counterB.length;
        data.requests = counterZ;

        const students = await Students.find();
        const counterC = students.filter((student => student.purchasedCourse.length > 0 ));
        const counterD = students.filter((student => student.purchasedCourse == 0));
        const sMonth = [];
        for (let i = 1; i < 13; i++){
            if()
        }
        
        data.totalStudents = students.length;
        data.pcStudents = counterC.length;
        data.upcStudents = counterD.length;

        const instructors = await Instructors.find();
        const counterE = instructors.filter((instructor => instructor.courses.length != 0 ));
        const counterF = instructors.filter((instructor => instructor.courses.length == 0 ));
        
        data.totalInstructors = instructors.length;
        data.pcInstructors = counterE.length;
        data.upcInstructors = counterF.length;

        console.log(data);

        if (data) res.status(200).json(data);
        else res.json('No Data!')
    } catch (err) { console.error(err); res.json('Server Error!') }
}

module.exports = { controller };