const course = require('../../../models/courses')
const instructor = require('../../../models/instructor')
const chalk = require('chalk');

async function controller(req, res) {
    // console.log(chalk.green.bgRed(req.body.courseID + '  :qq'));
    // console.log(req.body.title);
    
    //creating new
    if (req.body.courseID === '') {
        // console.log('new');
    const user = await instructor.findOne({ email: req.body.email });
        const courseExists = await course.findOne({ title: req.body.title, instructor: req.body.instructor });
        // console.log(user);
        // console.log(courseExists);

        if (courseExists !== null) {
            console.log(chalk.red.bgYellowBright('Course already exist'));

            res.status(409).json({ message: 'Course already exists' })
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
                rating: { netRating: 0 }
            })

            try {
                const saveCourse = await newCourse.save();
                res.status(201).json({ message: 'New Course Added', id: newCourse._id })
                console.log(chalk.white.bgGreenBright('New Course Added!'));
                // console.log(saveCourse);
                // console.log('saveCourseID: '+saveCourse._id);
            } catch (err) {
                console.log(err);
                res.status(400).json({ message: err.message });
            }
        }
    }
    //editing
    else {
        // console.log('old');
    // console.log(chalk.green.bgRed(req.body.courseID + '  :qq'));
    const existingCourse = await course.findOne({ _id: req.body.courseID});
        // console.log(existingCourse);
        if (req.body.title) existingCourse.title = req.body.title;
        if (req.body.miniDescription) existingCourse.description.miniDescription = req.body.miniDescription;
        if (req.body.category) existingCourse.category = req.body.category;
        existingCourse.rating = { netRating: 0 };

        try {
            await existingCourse.save();
            console.log('Course Updated!');
            res.status(200).json('Course Updated!')
        }catch(err){console.log(err);}
    }
}

module.exports = { controller }