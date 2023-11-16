const chalk = require('chalk')

async function controller(req, res) {
    // console.log(req.body);
    console.log(chalk.red(res.courses.sections[req.body.sectionIndex][req.body.viewType][req.body.viewIndex].notes));

    if (req.body) {
        try {
            const Notes = res.courses.sections[req.body.sectionIndex][req.body.viewType][req.body.viewIndex].notes;
            const Index = Notes.findIndex(obj => obj._id == String(req.body.noteID));

            res.courses.sections[req.body.sectionIndex][req.body.viewType][req.body.viewIndex].notes.splice(Index, 1);

            console.log(res.courses.sections[req.body.sectionIndex][req.body.viewType][req.body.viewIndex].notes);
            await res.courses.save();
            res.status(200).json('Note Deleted!')
        } catch (err) {
            console.error(err);
            res.status(500).json(err)
        }
    }
}

module.exports = {controller}