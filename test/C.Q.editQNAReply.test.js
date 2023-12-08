const request = require('supertest');
const assert = require('assert');
const mongoose = require('mongoose');
const app = require('../server'); // Import your server setup
const courses = require('../models/courses');
const Instructors = require("../models/instructor");

describe('Courses->QNA->Edit QNA Reply', () => {
    let testInstructor;
    let testCourse;

    beforeEach(async () => {
        testInstructor = await Instructors.create({
            name: "John Doe",
            email: "john@doe.com",
            password: "qqqqq111"
        });
        testCourse = await courses.create({
            title: 'Sample Course',
            description: {
                miniDescription: 'Short description for the sample course',
            },
            instructor: testInstructor._id, // Replace with an existing instructor ID
            category: 'Sample Category',
            price: {
                basePrice: 100,
                tax: 10,
                finalAmount: 110,
            },
            sections: [
                {
                    videos: [
                        {
                            title: 'video Title',
                            QnA: [
                                {   
                                    querry: {
                                        studentID: '654cbe41eabf42c1cc2742e9',
                                        text: 'Sample Querry',
                                    },
                                    replies: [
                                        {
                                            studentID: '65254085e4375892b7f9d2eb',
                                            replyBy: 'student',
                                            reply: 'Sample Reply'
                                        }
                                    ]
                                }
                            ],
                        }
                    ],
                }
            ],
            stripeProductID: 'sample_stripe_product_id',
            stripePriceID: 'sample_stripe_price_id',
            status: 'published',
        });
    });

    afterEach(async () => {
        await courses.deleteMany();
        await Instructors.deleteMany();
    });

    it('Edits a QNA Post', async () => {        
        const response = await request(app)
            .post(`/courses/editQnaReply/${testCourse._id}`)
        .send({sectionIndex: '0', viewType: 'videos', viewIndex: 0, querryIndex: 0, replyIndex: 0, editReply: 'updated reply'})

            assert.strictEqual(response.statusCode, 200);  
            assert.strictEqual(response._body, 'Reply Updated');  
    });

    // Add more test cases to cover different scenarios
});
