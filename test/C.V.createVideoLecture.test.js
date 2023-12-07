const request = require('supertest');
const assert = require('assert');
const mongoose = require('mongoose');
const app = require('../server'); // Import your server setup
const courses = require('../models/courses');
const Instructors = require("../models/instructor");

describe('Courses->Videos->Create Video lecture', () => {
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
                          videos: []
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

    it('Creates new video lecture in a course', async () => {  
        const SampleCreateTitle = 'Video 225';
        const SampleIndex = 0;
        const SamplevideoPath = 'video-path.mkv'

        const response = await request(app)
            .patch(`/courses/createVideoLecture/${testCourse._id}`)
        .send({videoTitle: SampleCreateTitle, sectionIndex: SampleIndex, videoPath: SamplevideoPath})

            assert.strictEqual(response.statusCode, 200);  
            assert.strictEqual(response._body.message, 'Video Created!');  
    });

    // Add more test cases to cover different scenarios
});
