const instructor = require('../../models/instructor')

async function controller(req, res) {
    console.log("controller");
    try {
        res.json( res.instructor );
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {controller}