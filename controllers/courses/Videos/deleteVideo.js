const fs = require('fs');
const chalk = require('chalk');
const path = require('path');

async function controller(req, res) {
    console.log('del');

    console.log(chalk.red(req.body.sectionIndex));
    console.log(chalk.red(req.body.videoIndex));

    try {
        console.log('try');
        const videoPathDB = res.courses.sections[req.body.sectionIndex].videos[req.body.videoIndex].path;

        const videoDir = path.join(__dirname, '..', '..', '..', 'public/Videos');
        console.log('Video Directory:', videoDir);

        fs.readdir(videoDir, (err, files) => {
            if (err) {
                console.error('Error reading directory:', err);
                return res.status(500).json({ message: 'Error reading directory' });
            }

            console.log('Files:', files);

            const foundFile = files.find(file => file === videoPathDB);
            if (foundFile) {
                console.log('File found:', foundFile);
                const filePath = path.join(videoDir, foundFile);

                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error(`Error deleting the file: ${err}`);
                        return res.status(500).json({ message: 'Error deleting the file' });
                    } else {
                        console.log('File Deleted from storage successfully');
                    }
                });
            } else {
                console.warn('File not found');
            }
        });

        await res.courses.sections[req.body.sectionIndex].videos.splice(req.body.videoIndex, 1);

        console.log('outTry');
        await res.courses.save();
        res.json({ message: 'Video Lecture Deleted!' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
}

module.exports = { controller };
