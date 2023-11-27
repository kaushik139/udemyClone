const Courses = require('../../models/courses')
const Students = require('../../models/student')
const Instructors = require('../../models/instructor')
const chalk = require('chalk')


async function controller(req, res) {
    // console.log('Overview');
    let data = {};
    try {
        const courses = await Courses.find();
        const counterA = courses.filter((course => course.status === "published"));
        const counterB = courses.filter((course => course.status !== 'published'));
        const counterZ = courses.filter((course => course.status === 'requested'));
        const cMonth = new Array(12).fill(0);
        courses.map(course => {
            if (course.publishedAt) {
                cMonth[course.publishedAt.getMonth()]++;
            }
        })
        // console.log(chalk.red(cMonth));

        data.totalCourses = courses.length;
        data.publishedCourses = counterA.length;
        data.unpublishedCourses = counterB.length;
        data.requests = counterZ;
        data.cMonth = cMonth;

        const students = await Students.find();
        const counterC = students.filter((student => student.purchasedCourse.length > 0));
        const counterD = students.filter((student => student.purchasedCourse == 0));
        const sMonth = [];
        for (let i = 0; i < 12; i++) {
            const counter = students.filter(student => student.createdAt.getMonth() === i)
            sMonth[i] = counter.length;
        }
        // console.log(chalk.red(sMonth));        

        data.totalStudents = students.length;
        data.pcStudents = counterC.length;
        data.upcStudents = counterD.length;
        data.sMonth = sMonth;


        const instructors = await Instructors.find();
        const counterE = instructors.filter((instructor => instructor.courses.length != 0));
        const counterF = instructors.filter((instructor => instructor.courses.length == 0));
        const iMonth = [];
        for (let i = 0; i < 12; i++) {
            const counter = instructors.filter(instructor => instructor.createdAt.getMonth() === i)
            iMonth[i] = counter.length;
        }
        // console.log(chalk.red(iMonth));

        data.totalInstructors = instructors.length;
        data.pcInstructors = counterE.length;
        data.upcInstructors = counterF.length;
        data.iMonth = iMonth;


        // console.log(data);

        if (data) res.status(200).json(data);
        else res.json('No Data!')
    } catch (err) { console.error(err); res.json('Server Error!') }
}

module.exports = { controller };