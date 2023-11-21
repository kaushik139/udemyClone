const courses = require('../../../models/courses')
const Instructors = require('../../../models/instructor')
const Fuse = require('fuse.js');
const chalk = require('chalk')

async function controller(req, res) {
    // console.log(req.params.text)

    const fuseOptions = {
        isCaseSensitive: false,
        // includeScore: false,
        shouldSort: true,
        // includeMatches: false,
        // findAllMatches: false,
        // minMatchCharLength: 1,
        // location: 0,
        // threshold: 0.6,
        // distance: 100,
        // useExtendedSearch: false,
        // ignoreLocation: false,
        // ignoreFieldNorm: false,
        // fieldNormWeight: 1,
        keys: [
            "title",
            // "author.firstName"
        ]
    };

    const list = await courses.find();
    const fuse = new Fuse(list, fuseOptions);
    const searchPattern = req.params.text;

    const results = fuse.search(searchPattern);

    const filteredResults = results.map(item => {
        return {
            id: item.item._id,
            title: item.item.title,
            instructor: item.item.instructor
        };
    });
    // console.log(filteredResults);

    const processedResults = [];
    for (let i = 0; i < filteredResults.length; i++) {
        const instructor = await Instructors.find({ _id: filteredResults[i].instructor });
        // console.log(instructor[0].name);
        processedResults.push({
            id: filteredResults[i].id,
            title: filteredResults[i].title,
            instructor: instructor[0].name
        })
    }
    // console.log(chalk.yellowBright('Processed: ' + processedResults[0].id));



    try {
        res.status(200).json({ processedResults })
    } catch (err) {
        return res.status(400).json({ message: 'Not Found!' });
    }
}

module.exports = { controller }