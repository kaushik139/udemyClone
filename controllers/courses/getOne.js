// const courses = require('../../models/courses')

async function controller(req, res) {
    try {
        res.json({ title: res.course });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {controller}