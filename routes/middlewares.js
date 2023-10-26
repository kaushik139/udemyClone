const multer = require('multer');
const path = require('path');

// code for Multer Images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/Images/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// code for Multer Videos
const storage2 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/Videos/');
  },
  filename: (req, file, cb) => {
    const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, '');
    const fName = timestamp + file.originalname;
    cb(null, fName);
  },
});

const upload2 = multer({ storage: storage2 });


//finding item by id
async function getItemById(model, itemName, req, res, next) {
  try {
    const item = await model.findById(req.params.id);
    if (item === null) {
      return res.status(404).json({ message: `${itemName} not Found!` });
    }
    res[itemName] = item;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

//checking for already existing emails, used in signup
async function checkEmail(model, req, res, next) {
  try {
    const item = await model.findOne({ email: req.body.email });
    if (item !== null) {
      return res.status(422).json({ message: "E-mail already exists!" })
    }
    else {
      next()
    }
  }
  catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

//Token generation
// async function generateToken(user) {
//     const token = jwt.sign({ id: user.id, username: user.name }, config.jwtKEY);
//             res.json({ token });  
// }


module.exports = {
  checkEmail,
  getItemById,
  upload,
  upload2
  // generateToken
}