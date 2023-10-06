const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../config.json')

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$$/.test(v)
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
        required: true,
        validate: {
            validator: function (v) {
                /"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"/.test(v)
            },
            message: 'Password must contain minimum eight characters, at least one letter and one number'
        }
    },
    currentCourse: {
        type: [
            {
                courseCode: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Course'
                },
                progress: {
                    type: Number
                },
                currentVideo: {
                    type: Number
                },
            }
        ]
    },
    purchasedCourse: {
        type: [
            {
                courseCode: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Course'
                }
            }
        ]
    },
    wishListedCourses: {
        type: [
            {
                courseCode: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Course'
                }
            }
        ]
    }

})


studentSchema.pre('save', async function (next) {
    const student = this;
    if (student.isModified('password')) {
        console.log('rounds:'+ config.saltRounds);
        try {
            const salt = await bcrypt.genSalt(config.saltRounds);
            console.log(salt);
            student.password = await bcrypt.hash(student.password, salt);
            next();
        } catch (err) {
            next(err);
        }
    } else {
        next();
    }
});

module.exports = mongoose.model("student", studentSchema)