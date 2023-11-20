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
        netRating: {
            type: Number,
            default: 0.0,
        },        
        ratings: [
            {
                rated: {
                    type: Number,
                    default: 0,
                },
                studentID: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'student',
                },
                text: String,
            },
        ],
    },

    stripeProductID: {
        type: String,
        required: true,
    },

    stripePriceID: {
        type: String,
        required: true,
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
                                studentID: {
                                    type: mongoose.Schema.Types.ObjectId,
                                    ref: 'student',
                                },
                                text: String,
                                time: {
                                    type: Date,
                                    default: () => Date.now(),
                                }
                            },
                            replies: [
                                {
                                    studentID: {
                                        type: mongoose.Schema.Types.ObjectId,
                                        ref: 'student',
                                    },
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
                    description: String,
                     notes: [
                        {
                            studentID: {
                                type: mongoose.Schema.Types.ObjectId,
                                ref: 'student',
                             },
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
                                studentID: {
                                    type: mongoose.Schema.Types.ObjectId,
                                    ref: 'student',
                                },                                text: String,
                                time: {
                                    type: Date,
                                    default: () => Date.now(),
                                }
                            },
                            replies: [
                                {
                                    studentID: {
                                        type: mongoose.Schema.Types.ObjectId,
                                        ref: 'student',
                                    },
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
            ]
        }
    ],
    enrollment: [
        {
            studentID: mongoose.Schema.Types.ObjectId, studentID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'student',
            },
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
