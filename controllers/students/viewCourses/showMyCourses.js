const student = require('../../../models/student')
const courses = require('../../../models/courses')

async function controller(req, res) {
    // console.log(req.params.email);

    if (req.params.email) {
        try {
            const user = await student.findOne({ email: req.params.email });
            const userCourseIDs = user.purchasedCourse.map((course) => {
                return course.courseCode;
            });
            let userPurchasedCourses = [];
            let y ;
            for (let i = 0; i < userCourseIDs.length; i++) {
                y = await courses.find({ _id: userCourseIDs[i] });
                userPurchasedCourses.push(y[0]);
            }
            // console.log(userPurchasedCourses[0].title);

            if (userPurchasedCourses.length) {
                res.status(201).json(userPurchasedCourses)
            }
            else res.send("No Course Found")
        }
        catch (err) {
            console.error(err);
        }
    }


}

module.exports = { controller }