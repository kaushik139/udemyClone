// const courses = require('../../models/courses')

async function controller(req, res) {
    console.log(';;;;');
    try {
        res.json({ item: res.courses });
        // console.log(res.courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {controller}