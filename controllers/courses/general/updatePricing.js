const courses = require('../../../models/courses')
const chalk = require('chalk')
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

async function controller(req, res) {

    // console.log(chalk.red('UpdatingPrice: '));
    // console.log(req.body.basePrice);
    // console.log(res.courses.price);

    if (req.body.basePrice !== null && req.body.tax !== null && req.body.finalAmount !== null) {

        const priceObject = {
            product: res.courses.stripeProductID,
            unit_amount: (req.body.finalPrice * 100),
            currency: "inr",
        };
        const price = await stripe.prices.create(priceObject);

        res.courses.price.basePrice = req.body.basePrice;
        res.courses.price.tax = req.body.tax;
        res.courses.price.finalAmount = req.body.finalPrice;
        res.courses.price.discountType = req.body.discountType;
        res.courses.price.discountPercent = req.body.discountPercent;
        res.courses.price.discountAmount = req.body.discountAmount;
        res.courses.stripePriceID = price.id;

        try {
            res.courses.save();
            res.status(200).json({ message: "Course Updated!" })
            console.log(chalk.bgWhiteBright('updated Course: '));
            // console.log(courses);
        } catch (err) {
            console.log(err)
            return res.status(400).json({ message: 'flow Error' });
        }
    }
    else return res.status(400).json({ message: 'Missing Fields' });

}

module.exports = { controller }