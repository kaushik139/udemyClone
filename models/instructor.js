const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                /^ [\w -\.] + @([\w -] +\.) + [\w -]{ 2, 4}$/.test(v)
            },
            message: 'Invalid E-mail!'
        }
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
    },
    password: {
        type: String,
        validate: {
            validator: function (v) {
                /"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"/.test(v)
            },
            message: 'Password must contain minimum eight characters, at least one letter and one number'
        }
    },
    courses: [
        {
            courseCode: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Course'
            },
        }
    ],
    bio: {
        type: String,
    },

})

module.exports = mongoose.model("instructor", instructorSchema)