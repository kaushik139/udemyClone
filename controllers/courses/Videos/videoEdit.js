const fs = require('fs');
const chalk = require('chalk');
const path = require('path');

async function controller(req, res) {
    // console.log(req.file.path);
    // console.log(chalk.yellowBright(res.courses.sections[req.body.sectionIndex].videos[req.body.videoIndex].path));
    // console.log(chalk.yellowBright(req.file.filename));
    // console.log(req.file);
    // console.log(req.body.sectionIndex);
    // console.log(req.body.videoIndex);

    fs.readdir(path.join(__dirname, '..', '..', '..', 'public/Videos'), (err, files) => {
            if (err) { } else {
                files.forEach((file) => {
                    // console.log(file);
                    if (file === res.courses.sections[req.body.sectionIndex].videos[req.body.videoIndex].path) {
                        // console.log('found');
                        fs.unlink(path.join(__dirname, '..', '..', '..', 'public/Videos', file), (err) => {
                            if (err) {
                              console.error('Error deleting file:', err);
                              return;
                            }
                            console.log('File deleted successfully:', file);
                          });
                    }
                });
            }
        });
    
    try {
        if (req.file.filename) {
            res.status(200).json({ message: 'Updated Video File', path: req.file.filename});
            console.log(chalk.yellowBright('Video File Updated!'));
        }

    } catch (err) {
        console.warn(err);
    }
}

module.exports = { controller };
