const students = require('../../../models/student')

async function controller(req, res) {
  // console.log(res.student._id);
  console.log(res.student.profileImage);
  // console.log(req.body.name);

  if (req.body.name) {
    res.student.name = req.body.name;
  }

  let img = '';
  if (res.student.profileImage) img = res.student.profileImage;
  if (req.file && req.file.filename) img = req.file.filename;

  try {
    //  update name without modifying the password
    const updatedStudent = await students.findOneAndUpdate(
      { _id: res.student._id }, // Filter by student ID
      {
        $set: {
          name: req.body.name,
          profileImage: img,
        },
      },
      { new: true } // Options: return the updated document
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({
      message: 'Updated!',
    });
  } catch (err) {
    console.error(err);
  }
}

module.exports = { controller };
