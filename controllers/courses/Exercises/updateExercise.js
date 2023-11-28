const chalk = require('chalk')

async function controller(req, res) {
    // console.log(chalk.red(req.body.filePath));
    // console.log(req.body.sectionIndex);
    // console.log(req.body.exerciseIndex);
    // console.log(req.body.title);
    // console.log(req.body.description);
    // console.log(res.courses.sections[req.body.sectionIndex].exercises[0]);
    // console.log(res.courses.sections[req.body.sectionIndex].exercises[req.body.exerciseIndex]);


    if (req.body.title && typeof(req.body.sectionIndex) === 'number' && typeof(req.body.exerciseIndex) === 'number') {
        res.courses.sections[req.body.sectionIndex].exercises[req.body.exerciseIndex].title = req.body.title
    }
    if (req.body.description && typeof(req.body.sectionIndex) === 'number' && typeof(req.body.exerciseIndex) === 'number') {
        res.courses.sections[req.body.sectionIndex].exercises[req.body.exerciseIndex].description = req.body.description
    }
    if (req.body.filePath != '' && typeof (req.body.sectionIndex) === 'number' && typeof (req.body.exerciseIndex) === 'number') {
        res.courses.sections[req.body.sectionIndex].exercises[req.body.exerciseIndex].filePath = req.body.filePath
    }

    try {
        await res.courses.save();
        console.log(chalk.bgWhite.red('Updated!'));
        // console.log(res.courses);
        res.status(200).json({message: 'Exercise Updated'})
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = { controller };