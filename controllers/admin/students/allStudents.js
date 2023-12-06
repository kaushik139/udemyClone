const Courses = require('../../../models/courses')
const Students = require('../../../models/student')

async function controller(req, res) {
    // console.log('All');
    try {
        let list = await Students.find().lean();
        if (list.length) res.status(200).json(list);
        else res.json('No Data!')
    } catch (err) { console.error(err); res.json('Server Error!') }
}

module.exports = { controller };