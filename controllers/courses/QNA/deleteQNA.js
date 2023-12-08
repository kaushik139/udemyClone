async function controller(req, res) {
    // console.log(res.courses);
    // console.log(req.body);
    // console.log(res.courses.sections[req.body.sectionIndex][req.body.viewType][req.body.viewIndex].QnA[req.body.querryIndex]);

    if (req.body) {
        try {
            res.courses.sections[req.body.sectionIndex][req.body.viewType][req.body.viewIndex].QnA.splice(req.body.querryIndex, 1);

            await res.courses.save();
            res.status(200).json('Deleted!')
        } catch (err) {
            console.error(err);
        }
    }
}

module.exports = {controller}