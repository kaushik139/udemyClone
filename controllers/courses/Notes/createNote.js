async function controller(req, res) {
    // console.log(req.body);

    if (req.body.note !== '') {
        try { 
            // console.log(res.courses.sections[req.body.sectionIndex][req.body.viewType][req.body.viewIndex].notes);
            // console.log(req.body.id);
            // console.log(req.body.note);
            res.courses.sections[req.body.sectionIndex][req.body.viewType][req.body.viewIndex].notes.push({
                studentID: req.body.id,
                note: req.body.note
            });

            res.courses.save();
            res.status(200).json('Note Saved');
        }
        catch(err){console.error(err);}
    }

}

module.exports = {controller}