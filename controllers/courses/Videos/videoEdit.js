const fs = require('fs');
const chalk = require('chalk');
const path = require('path');

async function controller(req, res) {
    // console.log(req.file.path);
    // console.log(chalk.yellowBright(req.file.filename));
    // console.log(req.file);
    // console.log(req.body.sectionIndex);
    // console.log(req.body.videoIndex);

fs.readdir(path.join(__dirname,'..','..','..','public/Videos'), (err, files) => {
    if (err) {} else {
        files.forEach((file) => {
            if (file === res.courses.sections[req.body.sectionIndex].videos[req.body.videoIndex].path) {
                // console.log('found');
                fs.unlink(path.join(__dirname,'..','..','..',`public/Videos/${file}`), (err) => {
                    if (err) {
                      console.error(`Error deleting the file: ${err}`);
                    } else {
                      console.log('File Replaced successfully');
                    }
                  });
            }
        });
    }
});

    try {
        if (req.file.filename) {
            res.status(200).json({ message: 'Updated Video File', path: req.file.filename});
            console.log(chalk.whiteBright('Video File Updated!'));
        }

    } catch (err) {
        console.warn(err);
        return res.status(500).json({ message: err.message });
    }
}

module.exports = { controller };
