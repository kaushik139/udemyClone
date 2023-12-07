const request = require('supertest');
const assert = require('assert');
const mongoose = require('mongoose');
const app = require('../server'); // Import your server setup
const courses = require('../models/courses');
const Instructors = require("../models/instructor");

describe('Courses->Videos->Get current Video', () => {
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
                            title: 'video 1',
                            path: '20231026095951620SampleVideo2.mp4'
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

    it('Fetches current Video', async function () {  
        const path = '20231026095951620SampleVideo2.mp4';

        const response = await request(app)
            .get(`/courses/getCurrentVideo/${path}`)

            assert.strictEqual(response.statusCode, 200);  
            assert.strictEqual(response._body.message, 'Video Created!');  
    });

    // Add more test cases to cover different scenarios
});
