const Courses = require('../../../models/courses')
const Instructors = require('../../../models/instructor')

async function controller(req, res) {
    try {
        // console.log("HERE")
        let list = await Courses.find().lean();

        for (let i = 0; i < list.length; i++) {
            const ins = await Instructors.findOne({ _id: list[i].instructor })
            list[i].instructorName = ins.name;
            // console.log(list[i]);
        }

        if (list.length) res.status(200).json(list);
        else res.json('No Data!')
    } catch (err) {
        console.log("))))")
        console.error(err);
        res.status(400).json('Server Error!')
    }
}

module.exports = { controller };