async function controller(req, res) {
    // console.log(req.body.studentID);
    // console.log(req.body.sectionIndex);
    // console.log(req.body.viewType);
    // console.log(req.body.viewIndex);
    // console.log(req.body.querryIndex);
    // console.log(req.body.studentID);
    // console.log();
    const replyBy = req.body.replyBy ? 'instructor' : 'student';

    if (req.body.replyText) {
        try {
            res.courses.sections[req.body.sectionIndex][req.body.viewType][req.body.viewIndex].QnA[req.body.querryIndex].replies.push({
                studentID: req.body.studentID,
                replyBy: replyBy,
                reply: req.body.replyText
            });

            await res.courses.save();
            res.status(200).json('Reply Added')
         } catch (err) {
            console.error(err);
            res.status(500).json('Server Error')
        }


    }

    


}

module.exports = {controller}