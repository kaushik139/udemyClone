const instructor = require('../../models/instructor')

async function getAll(req, res) {
    try {
        const instructors = await instructor.find()
        res.json(instructors)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
module.exports = {getAll}

