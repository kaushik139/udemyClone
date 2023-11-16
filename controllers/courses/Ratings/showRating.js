const chalk = require('chalk')

async function controller(req, res) {
    // console.log(res.courses);
    // console.log(req.body.id);

    if (req.body.id) {
        try {
           
            const UserRating = res.courses.rating.ratings.find(obj => obj.studentID == String(req.body.id));
            console.log(UserRating);
        
            // res.status(200).json('Ratings Saved!')

       }catch(err){console.error(err);}
    }

}

module.exports = {controller}