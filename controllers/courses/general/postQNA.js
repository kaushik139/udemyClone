const courses = require('../../../models/courses')

async function controller(req, res) {
    console.log(res.courses.sections[0].exercises[0].QnA);

    // console.log(req.body);
    // console.log(res.courses.sections[req.body.sectionIndex][req.body.viewType][req.body.viewIndex]);
    if (req.body.querry !== '' && req.body.sectionIndex && req.body.viewIndex && req.body.viewType && req.body.id) {
        // console.log('check');
        try {
            res.courses.sections[req.body.sectionIndex][req.body.viewType][req.body.viewIndex].QnA.push({
                querry: {
                    studentID: req.body.id,
                    text: req.body.querry
                }
            })

            await res.courses.save();

            res.status(200).json('Querry Posted!')
        }
        catch (err) {
            console.error(err);
            res.status(500).json('Error saving Querry!')
        }
    }
    else console.error('Missing Data');

}

module.exports = {controller}