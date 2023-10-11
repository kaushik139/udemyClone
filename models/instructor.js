const mongoose = require('mongoose');
const config = require('../config.json')
const bcrypt = require('bcrypt');

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
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                .test(v)            },
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
                return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
                .test(v)
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


instructorSchema.pre('save', async function (next) {
    const instructor = this;
    if (instructor.isModified('password')) {
        try {
            const salt = await bcrypt.genSalt(config.saltRounds);
            instructor.password = await bcrypt.hash(instructor.password, salt);
            next();
        } catch (err) {
            next(err);
        }
    } else {
        next();
    }
});

module.exports = mongoose.model("instructor", instructorSchema)