async function controller(req, res) {
    console.log(req.body);
    // console.log(res.courses.sections[req.body.index]);
    // console.log(res.courses.sections[req.body.index]);
    // console.log(req.body.title);
    // console.log(req.body.description);
    // console.log(req.body.index);

    // if (req.body.title && req.body.description && typeof(req.body.index) === 'number') {
    //     // console.log('i');
    //     res.courses.sections[req.body.index].exercises.push({title: req.body.title, description: req.body.description})
    // }

    // try {
    //     await res.courses.save();
    //     console.log('Saved!');
    //     // console.log(res.courses);
    //     res.status(200).json({message: 'Exercise Added'})
    // }
    // catch (err) {
    //     console.log(err);
    // }
}

module.exports = { controller };