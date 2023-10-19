const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        miniDescription: {
            type: String,
            required: true,
        },
        fullDescription: {
            type: String,
        }
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'instructor',
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        basePrice: {
            type: Number,
        required: true,
        },
        discountType: {
            type: String
        },
        discountAmount: {
            type: Number,
        },
        discountPercent: {
            type: Number,
        },
        tax: {
            type: Number,
        required: true,
        },
        finalAmount: {
            type: Number,
        required: true,
        }
    },
    rating: [
        {
            type: Number,
            default: 0,
            studentId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'student'
            }
        }
    ],
    duration: {
        type: Number,
    },
    images: {
        thumbnail: {
            type: String,
        },
        bgImage: {
            type: String,
        }
    },
    sections: [
        {
            title: String,
            sectionDesctiption: String,
            videos: [
                {
                    title: String,
                    path: String,

                }
            ],
            exercises: [
                {
                    title: String,
                    path: String
                }
            ]
        }
    ],
    status: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Course", courseSchema);
