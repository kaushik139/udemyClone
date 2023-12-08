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
        const sampleTitle = 'sample title';
        const sampleCategory = 'sample category';

        const response = await request(app)
            .patch(`/courses/${testCourse._id}`)
            .send({title: sampleTitle, category: sampleCategory})

            assert.strictEqual(response.statusCode, 200);  
        assert.strictEqual(response._body.message, 'Course Updated!');  
        assert.strictEqual(response._body.updatedCourse.title, sampleTitle);  
        assert.strictEqual(response._body.updatedCourse.category, sampleCategory);  
    });
});
