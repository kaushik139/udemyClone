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
        type: Number,
        required: true,
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
    thumbnail: {
        type: String,
    },
    lectures: [
        {
            title: String,
            videoURL: String,
            duration: Number,
        }
    ],
    status: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Course", courseSchema);
