const courses = require('../../../models/courses')
let endpointSecret = process.env.END_POINT_SECRET;
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const chalk = require('chalk')



async function controller(req, res) {
    // console.log(req.params.id);
    // console.log(req.body.courseID);
    // console.log(res.student);
    // console.log(course[0].stripePriceID);


    try {

        let course = await courses.find({ _id: req.body.courseID })
        const priceId = course[0].stripePriceID;
        console.log(priceId)
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: priceId,
                    quantity: 1, 
                },
            ],
            payment_intent_data: {
                metadata: {
                    studentId: req.params.id,
                    courseId: req.body.courseID,
                },
            },
            mode: "payment",
            success_url: `http://localhost:8080/sHome`,
            cancel_url: `http://localhost:8080/player`,
        });
        // console.log(session);

        res.status(200).send({ url: session.url });
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }

}

module.exports = { controller }