const Courses = require('../../../models/courses')
const Instructors = require('../../../models/instructor')

async function controller(req, res) {
    try {
        let list = await Courses.find({ status: 'published' }).lean();

        for (let i = 0; i < list.length; i++) {
            const ins = await Instructors.findOne({ _id: list[i].instructor })
            list[i].instructorName = ins.name;
            console.log(list[i]);
        }

        if (list.length) res.status(200).json(list);
        else res.json('No Data!')
    } catch (err) { console.error(err); res.json('Server Error!') }
}

module.exports = { controller };