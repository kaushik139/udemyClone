const chalk = require('chalk')

async function controller(req, res) {
    // console.log(req.body);

    if (req.body.rating && req.body.text && req.body.id) {
        try {
           
            const Index = res.courses.rating.ratings.findIndex(obj => obj.studentID == String(req.body.id));
            if (Index > -1) {
                res.courses.rating.ratings[Index].rated = req.body.rating;
                res.courses.rating.ratings[Index].text = req.body.text;
            }
            else {
                res.courses.rating.ratings.push({
                    studentID: req.body.id,
                    rated: req.body.rating,
                    text: req.body.text
                });
            }
            const loop = res.courses.rating.ratings.length;
            let ratingSum = 0;
            let avgRating = 0;
            if (loop > -1) {
                for (let i = 0; i < loop; i++){
                    ratingSum += res.courses.rating.ratings[i].rated;
                }
                avgRating = ratingSum / loop;
            }
            res.courses.rating.netRating = avgRating;
        
            res.courses.save();
            res.status(200).json('Ratings Saved!')

       }catch(err){console.error(err);}
    }

}

module.exports = {controller}