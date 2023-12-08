const request = require('supertest');
const assert = require('assert');
const mongoose = require('mongoose');
const app = require('../server'); // Import your server setup
const Instructors = require("../models/instructor");
const Courses = require('../models/courses')

describe('Courses->General->Request Publish', () => {
    let testInstructor;
    let testCourse;
    let testCourse2;

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
        testCourse2 = await Courses.create({
            title: 'Sample Course II',
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
            status: 'requested',
        });
    });

    afterEach(async () => {
        await Instructors.deleteMany();
        await Courses.deleteMany();
    });

    it('Requests for publishing of a course', async () => {  

        const response = await request(app)
            .patch(`/courses/requestPublish/${testCourse._id}`)

            assert.strictEqual(response.statusCode, 200);  
        assert.strictEqual(response._body, 'Requested to Publish');  
    });

    it('checks already requested condition', async () => {  

        const response = await request(app)
            .patch(`/courses/requestPublish/${testCourse2._id}`)

            assert.strictEqual(response.statusCode, 202);  
        assert.strictEqual(response._body, 'Already Requested!');  
    });

    // Add more test cases to cover different scenarios
});
