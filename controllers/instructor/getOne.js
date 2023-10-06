const instructor = require('../../models/instructor')

async function getOne(req, res) {
    try {
        res.json({ name: res.instructor });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {getOne}