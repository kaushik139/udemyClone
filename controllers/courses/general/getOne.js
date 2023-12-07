async function controller(req, res) {
    // console.log(req.params.id);

    try {

        // if (id) {
        //     const user = await students.find({ _id: id })
        //     if (user.currentCourse.watched) {
        //         console.log(user.currentCourse.watched);
        //     }
        // }

        res.json({ item: res.courses });
        // console.log(res.courses);
    } catch (err) {
    }
}

module.exports = {controller}