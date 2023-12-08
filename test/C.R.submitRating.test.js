const request = require('supertest');
const assert = require('assert');
const mongoose = require('mongoose');
const app = require('../server'); // Import your server setup
const courses = require('../models/courses');
const Instructors = require("../models/instructor");
const student = require("../models/student");
const chalk = require('chalk')

describe('Courses->Ratings->Submit Ratings', () => {
    let testInstructor;
    let testCourse;
    let testStudent;
    let testStudent2;

    beforeEach(async () => {
        testInstructor = await Instructors.create({
            name: "John Doe",
            email: "john@doe.com",
            password: "qqqqq111"
        });
        testStudent = await student.create({
            name: "John Doe II",
            email: "john2@doe.com",
            password: "qqqqq111",
        });
        testStudent2 = await student.create({
            name: "John Doe III",
            email: "john3@doe.com",
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
            rating: {
                netRating: 3,
                ratings: [
                    {
                        rated: 3,
                        studentID: testStudent._id,
                        text: 'Sample Rating test'
                    }
                ]
            },
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
    it('Updates Ratings', async () => {        
        const response = await request(app)
            .post(`/courses/submitRating/${testCourse._id}`)
        .send({id: testStudent._id, rating: 2, text: 'Sample text'})

            assert.strictEqual(response.statusCode, 200);  
            assert.strictEqual(response._body, 'Ratings Saved!');  
    });

    it('Creates new Rating', async () => {        
        const response = await request(app)
            .post(`/courses/submitRating/${testCourse._id}`)
        .send({id: testStudent2._id, rating: 2, text: 'Sample text'})

            assert.strictEqual(response.statusCode, 200);  
            assert.strictEqual(response._body, 'Ratings Saved!');  
    });
});
