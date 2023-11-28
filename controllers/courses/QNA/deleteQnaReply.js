async function controller(req, res) {
    // console.log(req.body);

    if (res.courses && req.body) {
        try {
            // console.log(res.courses.sections[req.body.sectionIndex][req.body.viewType][req.body.viewIndex].QnA[req.body.querryIndex]);

            res.courses.sections[req.body.sectionIndex][req.body.viewType][req.body.viewIndex].QnA[req.body.querryIndex].replies.splice(req.body.replyIndex, 1);

            res.courses.save();
            res.status(200).json('Reply Deleted')
        }catch(err){console.error(err);}
    }

}

module.exports = {controller}