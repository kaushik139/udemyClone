async function controller(req, res) {

    // console.log(chalk.red(req.body.sectionIndex));
    // console.log(chalk.red(req.body.exerciseIndex));
    
    try {
        await res.courses.sections[req.body.sectionIndex].exercises.splice(req.body.exerciseIndex, 1);
        await res.courses.save();
        res.json({ message: 'Exercise Deleted!' })
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = { controller }