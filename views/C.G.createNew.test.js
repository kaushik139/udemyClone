const request = require('supertest');
const assert = require('assert');
const mongoose = require('mongoose');
const app = require('../server'); // Import your server setup
const Instructors = require("../models/instructor");
const Courses = require('../models/courses')

describe('Courses->General->Create Course', () => {
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

    it('Creates new Course', async () => {  
        const sampleTitle = 'sample title';
        const sampleDescription = 'sample Description';
        const sampleCategory = 'sample Category'

        const response = await request(app)
            .post(`/courses/`)
            .send({title: sampleTitle, miniDescription: sampleDescription, category: sampleCategory, email: testInstructor.email, courseID: ''})

            assert.strictEqual(response.statusCode, 201);  
        assert.strictEqual(response._body.message, 'New Course Added');  
    });

    it('Updates existing Courses', async () => {  
        const sampleTitle = 'sample title';
        const sampleDescription = 'sample Description';
        const sampleCategory = 'sample Category';

        const response = await request(app)
        .post(`/courses/`)
        .send({title: sampleTitle, miniDescription: sampleDescription, category: sampleCategory, email: testInstructor.email, courseID: testCourse._id})

        assert.strictEqual(response.statusCode, 201);  
    assert.strictEqual(response._body.message, 'Course Updated!');  
    });

    // Add more test cases to cover different scenarios
});
