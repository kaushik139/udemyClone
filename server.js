require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const chalk = require('chalk')

const studentsRouter = require('./routes/students')
const instructorsRouter = require('./routes/instructor')
const coursesRouter = require('./routes/courses')
const adminRouter = require('./routes/admin')
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const endpointSecret = process.env.END_POINT_SECRET
const app = express()
const students = require('./models/student')
const courses = require('./models/courses')

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true, useUnifiedTopology: true
})
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to Database'));

// webHook
app.post(
    "/stripe/webhook",
    express.raw({ type: "application/json" }),
    async (request, response) => {
        const sig = request.headers["stripe-signature"];

        let event;

        try {
            event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
            // console.log(event)
        } catch (err) {
            // console.log(err)
            response.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }

        switch (event.type) {
            case "payment_intent.succeeded":
                const paymentIntentSucceeded = event.data.object;
                const metadata = paymentIntentSucceeded.metadata;
                const studentId = metadata.studentId;
                const courseId = metadata.courseId;
                try {
                    let course = await courses.findOne({ _id: courseId });
                    if (course) {
                        course.enrollment.push({ studentID: studentId });
                        await course.save();
                    }

                    const updatedStudent = await students.findOneAndUpdate(
                        { _id: studentId },
                        { $push: { purchasedCourse: { courseCode: courseId } } },
                        { new: true } // Options: return the updated document
                    );
                    // console.log(chalk.red(student));
                    // console.log(chalk.yellowBright(course));

                } catch (err) { console.error(err); }
                console.log("PAYMENT DONE")
                break;

            default:
                console.log(`Unhandled event type ${event.type}`);
        }

        response.send();
    },
);

app.use(express.json())
app.use(cors())
app.use('/students', studentsRouter)
app.use('/instructors', instructorsRouter)
app.use('/courses', coursesRouter)
app.use('/admin', adminRouter)
app.use('/images', express.static('public/Images'));
app.use('/files', express.static('public/Files'));


app.listen(process.env.port, () => {
    console.log(chalk.red.bgYellowBright('Listening on Port 3000!' + Date().slice(15, 25)));
})

