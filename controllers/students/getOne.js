// const student = require('../../models/student')

async function controller(req, res) {
    try {
        res.json({ name: res.student });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {controller}