const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type:String
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        validate: {
            validator: function(v) {
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

module.exports = mongoose.model("student", studentSchema)