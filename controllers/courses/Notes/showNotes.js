async function controller(req, res) {
    // console.log(req.body.id);

    if (req.body !== '') {
        try { 
            // console.log(res.courses.sections[req.body.sectionIndex][req.body.viewType][req.body.viewIndex].notes);
            // console.log(req.body.id);
        
            const Notes = res.courses.sections[req.body.sectionIndex][req.body.viewType][req.body.viewIndex].notes;
            const UserNotes = Notes.filter((note) => {
                return note.studentID == req.body.id
            })
            res.status(200).json(UserNotes);
        }
        catch(err){console.error(err);}
    }

}

module.exports = {controller}