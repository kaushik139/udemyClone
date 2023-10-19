const course = require('../../models/courses')
const instructor = require('../../models/instructor')
const chalk = require('chalk');

async function controller(req, res) {

    const user = await instructor.findOne({ _id: req.body.instructor });
    const courseExists = await course.findOne({ title: req.body.title, instructor: req.body.instructor });

    if (courseExists) {
        console.log(chalk.red.bgYellowBright('Course: "' + req.body.title + '" already exists for user: "' + user.name + '"'));

        res.status(409).json({ message: 'Course: "' + req.body.title + '" already exists for user: "' + user.name + '"' })
    }
    else {

        const newCourse = new course({
            title: req.body.title,
            description: { miniDescription: req.body.miniDescription },
            instructor: user._id,
            category: req.body.category,
            price: {
                basePrice: 0,
                discountType: null,
                discountAmount: null,
                discountPercent: null,
                tax: 0,
                finalAmount: 0
            },
            status: 'draft',
        })

        try {
            const saveCourse = await newCourse.save();
            res.status(201).json({ message: 'New Course Added', id: saveCourse._id })
            console.log(chalk.white.bgGreenBright('New Course Added!'));
            console.log(saveCourse);
            // console.log('saveCourseID: '+saveCourse._id);
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: err.message });
        }
    }
}

module.exports = { controller }