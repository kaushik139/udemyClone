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
    rating: {
        netRating: Number,
        ratings: [
            {
                rated: {
                    type: Number,
                    default: 0.0,
                },
                studentId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'student',
                },
                text: String,
            },
        ],
    },
    duration: {
        type: Number,
    },
    images: {
        thumbnail: {
            type: String,
            default: null
        },
        bgImage: {
            type: String,
            default: null
        }
    },
    sections: [
        {
            sectionTitle: String,
            sectionDesctiption: String,
            videos: [
                {
                    title: String,
                    path: String,
                    notes: [
                        {
                            studentID: mongoose.Schema.Types.ObjectId,
                            note: String,
                            time: {
                                type: Date,
                                default: () => Date.now(),
                            }
                        }
                    ],
                    QnA: [
                        {
                            querry: {
                                studentID: mongoose.Schema.Types.ObjectId,
                                text: String,
                                time: {
                                    type: Date,
                                    default: () => Date.now(),
                                }
                            },
                            replies: [
                                {
                                    ID: mongoose.Schema.Types.ObjectId,
                                    replyBy: String,
                                    reply: String,
                                    time: {
                                        type: Date,
                                        default: () => Date.now(),
                                    }
                                }
                            ]
                        }
                    ]

                }
            ],
            exercises: [
                {
                    title: String,
                    description: String
                }
            ]
        }
    ],
    enrollment: [
        {
            studentID: mongoose.Schema.Types.ObjectId,
            purchasedOn: {
                type: Date,
                default: () => Date.now(),
            }
        }
    ],
    status: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Course", courseSchema);
