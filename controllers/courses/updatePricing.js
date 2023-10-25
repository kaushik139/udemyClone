const courses = require('../../models/courses')
const chalk = require('chalk')

async function controller(req, res) {

    console.log(chalk.red('UpdatingPrice: '));
    // console.log(req.body.basePrice);
    // console.log(res.courses.price);
    
    if (req.body.basePrice !== null && req.body.tax !== null && req.body.finalAmount !== null) {
        res.courses.price.basePrice = req.body.basePrice
        res.courses.price.tax = req.body.tax
        res.courses.price.finalAmount = req.body.finalPrice
        res.courses.price.discountType = req.body.discountType
        res.courses.price.discountPercent = req.body.discountPercent
        res.courses.price.discountAmount = req.body.discountAmount
   
        try {
            res.courses.save();
            res.status(200).json({ message: "Course Updated!" })
            console.log(chalk.bgWhiteBright('updated Course: '));
            // console.log(courses);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }
    else return res.status(400).json({ message: 'Missing Fields' });

}

module.exports = {controller}