const request = require('supertest');
const assert = require('assert');
const mongoose = require('mongoose');
const app = require('../server'); // Import your server setup
const courses = require('../models/courses');
const Instructors = require("../models/instructor");

describe('Courses->Videos->Update Video Lecture', () => {
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
                    exercises: [],
                    sectionDesctiption: 'Sample Description',
                    sectionTitle: 'Section 123',
                    videos: [
                        {
                            title: 'title',
                            path: 'path'
                        }
                    ]
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

    it('Deletes updates video in a course', async () => {
        const sampleVideoPath = 'path 777'
        const sampleVideoTitle = 'title 222'
        const sampleSectionIndex = 0;
        const sampleVideoIndex = 0;


        const response = await request(app)
            .patch(`/courses/updateVideoLecture/${testCourse._id}`)
            .send({ sectionIndex: sampleSectionIndex, videoIndex: sampleVideoIndex, videoTitle: sampleVideoTitle, videoPath: sampleVideoPath })

        assert.strictEqual(response.statusCode, 200);
        assert.strictEqual(response._body.message, 'Video Updated!');
    });

    // Add more test cases to cover different scenarios
});
