async function controller(req, res) {
    // console.log(req.body);

    if (res.courses && req.body) {
        try {
            // console.log(res.courses.sections[req.body.sectionIndex][req.body.viewType][req.body.viewIndex].QnA[req.body.querryIndex].replies[req.body.replyIndex].reply);

            res.courses.sections[req.body.sectionIndex][req.body.viewType][req.body.viewIndex].QnA[req.body.querryIndex].replies[req.body.replyIndex].reply = req.body.editReply;

            res.courses.save();
            res.status(200).json('Reply Updated')
        }catch(err){console.error(err);}
    }

}

module.exports = {controller}