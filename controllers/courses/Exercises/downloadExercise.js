// const courses = require('../../models/courses');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

async function controller(req, res) {
    // console.log(req.params.path);
    // ../../../public/Files   

    try {
        if (req.params.path) {
            const filePath = path.join(__dirname, '..', '..', '..', 'public', 'Files', req.params.path);
            // console.log(filePath);
            const name = req.params.path.slice(17);
            res.setHeader('Content-Disposition', `attachment; filename=${req.params.path}`);
            res.download(filePath, name);
        }

    } catch (err) {
        console.warn(err);
        return res.status(500).json({ message: 'Path Error!' });
    }
}

module.exports = { controller };
