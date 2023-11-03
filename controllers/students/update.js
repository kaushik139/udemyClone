const student = require('../../models/student');
const multer = require('multer');
const path = require('path');

// Configure Multer for handling image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/Images/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

async function controller(req, res) {
  console.log(req.body.name);

  if (req.body.name !== null) {
    res.student.name = req.body.name;
  }

  if (req.body.image !== '') {
    upload.single('image')(req, res, async (err) => {
      if (err) {
        console.error('Error uploading image:', err);
        return res.status(400).json({ message: 'Image upload error' });
      }

      if (req.file) {
        console.log('Image uploaded:', req.file);
        res.student.image = {
          filename: req.file.filename,
        };
      }

      try {
        // Use findOneAndUpdate to update the specific fields without modifying the password
        const updatedStudent = await student.findOneAndUpdate(
          { _id: res.student._id }, // Filter by student ID
          {
            name: req.body.name,
            image: req.file ? { filename: req.file.filename } : null,
          }, // Update name and image if provided
          { new: true } // Options: return the updated document
        );

        if (!updatedStudent) {
          return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json({
          message: 'Student Updated!',
          student: updatedStudent,
        });
      } catch (err) {
        return res.status(400).json({ message: err.message });
      }
    });
  } else {
    try {
      // Use findOneAndUpdate to update the name without modifying the password
      const updatedStudent = await student.findOneAndUpdate(
        { _id: res.student._id }, // Filter by student ID
        { name: req.body.name }, // Update name
        { new: true } // Options: return the updated document
      );

      if (!updatedStudent) {
        return res.status(404).json({ message: 'Student not found' });
      }

      res.status(200).json({
        message: 'Student Updated!',
        student: updatedStudent,
      });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }
}

module.exports = { controller };
