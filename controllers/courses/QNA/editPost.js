async function controller(req, res) {
    console.log(req.body);

    // sectionIndex: '0',
    // viewIndex: '0',
    // viewType: 'exercises',
    // querryIndex: 0,
    // text: 'qqqaaazzzsssssssssssssss'

    if (req.body) {
        try {
            // console.log(res.courses.sections[req.body.sectionIndex][req.body.viewType][req.body.viewIndex].QnA[req.body.querryIndex].querry.text);
            res.courses.sections[req.body.sectionIndex][req.body.viewType][req.body.viewIndex].QnA[req.body.querryIndex].querry.text = req.body.text;

            await res.courses.save();
            res.status(200).json('Post Updated');
        }catch(err){console.error(err);}
    }

}

module.exports = {controller}