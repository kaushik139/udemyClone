const request = require('supertest');
const assert = require('assert');
const mongoose = require('mongoose');
const app = require('../server'); // Import your server setup
const courses = require('../models/courses');
const Instructors = require("../models/instructor");
const student = require("../models/student");
const chalk = require('chalk')

describe('Courses->QNA->Reply QNA', () => {
    let testInstructor;
    let testCourse;
    let testStudent;

    beforeEach(async () => {
        testInstructor = await Instructors.create({
            name: "John Doe",
            email: "john@doe.com",
            password: "qqqqq111"
        });
        testStudent = await student.create({
            name: "John Doe II",
            email: "john@doe.com",
            password: "qqqqq111",
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
                                        studentID: testStudent._id,
                                        text: 'Sample Querry',
                                    },
                                    replies: [
                                        {
                                            studentID: testStudent._id,
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
        await student.deleteMany();
    });
    it('Replies QNA', async () => {        
        const response = await request(app)
            .post(`/courses/replyQNA/${testCourse._id}`)
        .send({sectionIndex: '0', viewType: 'videos', viewIndex: '0', studentID: testStudent._id, replyText: 'Sample reply', replyBy: 'student', querryIndex: '0'})

            assert.strictEqual(response.statusCode, 200);  
            assert.strictEqual(response._body, 'Reply Added');  
    });
});
