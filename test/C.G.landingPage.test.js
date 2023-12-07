const request = require('supertest');
const assert = require('assert');
const mongoose = require('mongoose');
const app = require('../server'); // Import your server setup
const Instructors = require("../models/instructor");
const Courses = require('../models/courses')

describe('Courses->General->Landing Page', () => {
    let testInstructor;
    let testCourse;

    beforeEach(async () => {
        testInstructor = await Instructors.create({
            name: "John Doe",
            email: "john@doe.com",
            password: "qqqqq111"
        });
        testCourse = await Courses.create({
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
            stripeProductID: 'sample_stripe_product_id',
            stripePriceID: 'sample_stripe_price_id',
            status: 'draft',
        });
    });

    afterEach(async () => {
        await Instructors.deleteMany();
        await Courses.deleteMany();
    });

    it('Creates landing page', async () => {  
        const sampleDescription = 'sample Description';

        const response = await request(app)
            .patch(`/courses/landingPage/${testCourse._id}`)
            .send({desc: sampleDescription})

            assert.strictEqual(response.statusCode, 200);  
        assert.strictEqual(response._body.message, 'Updated');  
    });

    it('checks fail condition', async () => {  
        const sampleDescription = 'sample Description';

        const response = await request(app)
            .patch(`/courses/landingPage/${testCourse._id}`)

            assert.strictEqual(response.statusCode, 400);  
        assert.strictEqual(response._body.message, 'Missing Fields');  
    });

    // Add more test cases to cover different scenarios
});
