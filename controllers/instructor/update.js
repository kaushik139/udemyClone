const instructors = require('../../models/instructor')

async function controller(req, res) {
  // console.log('id: '+res.instructor._id);
  // console.log('image: '+res.instructor.profileImage);
  // console.log('name: '+req.body.name);
  // console.log(req.body);
  // console.log('file: '+req.file.fileName);

  let name = '';
  if (res.instructor.name) name = res.instructor.name;
  if (req.body.name) name = req.body.name;

  let img = '';
  if (res.instructor.profileImage) img = res.instructor.profileImage;
  if (req.file && req.file.filename) img = req.file.filename;

  try {
    //  update name without modifying the password
    const updatedInstructor = await instructors.findOneAndUpdate(
      { _id: res.instructor._id }, // Filter by instructor ID
      {
        $set: {
          name: name,
          profileImage: img,
        },
      },
      { new: true } // Options: return the updated document
    );

    if (!updatedInstructor) {
      return res.status(404).json({ message: 'Instructor not found' });
    }

    res.status(200).json({
      message: 'Updated!',
    });
  } catch (err) {
    console.error(err);
  }
}

module.exports = { controller };
