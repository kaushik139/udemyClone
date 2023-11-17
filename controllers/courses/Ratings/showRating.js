const chalk = require('chalk')

async function controller(req, res) {
    // console.log(res.courses);
    // console.log(req.body.id);

    if (req.body.id) {
        try {

            const UserRating = res.courses.rating.ratings.find(obj => obj.studentID == String(req.body.id));
            // console.log(UserRating);

            const ratings = res.courses.rating.ratings;

            const counts = {};

            for (let i = 1; i <= 5; i++) {
                counts[`rated_${i}`] = ratings.reduce((sum, obj) => {
                    if (obj.rated === i) {
                        return sum + 1;
                    }
                    return sum;
                }, 0);
            }
            // console.log(counts);
            const totalRatings = counts.rated_1 + counts.rated_2 + counts.rated_3 + counts.rated_4 + counts.rated_5;

            res.status(200).json({UserRating: UserRating, counts: counts, totalRatings: totalRatings, netRated: res.courses.rating.netRating})

        } catch (err) { console.error(err); }
    }

}

module.exports = { controller }