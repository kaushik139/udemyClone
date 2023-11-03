const courses = require('../../../models/courses');


async function controller(req, res) {
    // console.log(req.params.page);
    const page = req.params.page;
    const coursesPerPage = 8;
    
    const startIndex = page * coursesPerPage;
    
    try {
      const coursesOnPage = await courses
        .find({status: 'published'})
        .skip(startIndex)
          .limit(coursesPerPage);
        
        
    
        res.status(200).json(coursesOnPage);
        // console.log(coursesOnPage[0].title)
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
    

}

module.exports = {controller}