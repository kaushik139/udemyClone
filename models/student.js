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
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                .test(v)
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
                return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
                .test(v)
            },
            message: 'Password must contain minimum eight characters, at least one letter and one number.'
        }
    },
    
    profileImage:  String,
    
    currentCourse:[
            {
                courseCode: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Course'
                },
                progress: Number,
                currentSectionIndex: Number,
                currentViewType: String,
            currentViewIndex: Number,
            watched: [
                {
                    section: Number,
                    view: String,
                    viewIndex: Number
                }
            ]
            }
        ],
    purchasedCourse:[
            {
                courseCode: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Course'
                }
            }
        ],
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
        try {
            const salt = await bcrypt.genSalt(config.saltRounds);
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