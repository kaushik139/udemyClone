const chalk = require('chalk')

async function controller(req, res) {
    // console.log(chalk.red(req.body.noteID));

    if (req.body.note !== '') {
        try {
            // console.log(chalk.red(res.courses.sections[req.body.sectionIndex][req.body.viewType][req.body.viewIndex].notes));
            // console.log(req.body.id);
            // console.log(req.body.note);
            const Notes = res.courses.sections[req.body.sectionIndex][req.body.viewType][req.body.viewIndex].notes;
            const Index = Notes.findIndex(obj => obj._id == String(req.body.noteID));
            
            res.courses.sections[req.body.sectionIndex][req.body.viewType][req.body.viewIndex].notes[Index].note = req.body.note;
            
            res.courses.save();
            res.status(200).json('Note Edited');
        }
        catch(err){console.error(err);}
    }

}

module.exports = {controller}