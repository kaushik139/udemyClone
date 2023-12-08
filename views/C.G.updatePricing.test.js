const request = require('supertest');
const assert = require('assert');
const mongoose = require('mongoose');
const app = require('../server'); // Import your server setup
const Instructors = require("../models/instructor");
const Courses = require('../models/courses')

describe('Courses->General->Update Pricing', () => {
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
            stripeProductID: 'prod_P5CEYNWqe4MORh',
            stripePriceID: 'sample_stripe_price_id',
            status: 'draft',
        });
    });

    afterEach(async () => {
        await Instructors.deleteMany();
        await Courses.deleteMany();
    });

    it('Updates Pricing', async () => {  
        SamplebasePrice = 200;
           const SampleTax = 20;
           const SampleFinalAmount = 180;
           const SampleDiscountType = 'amount';
           const SampleDiscountPercent = 20;
           const SampleDiscountAmount = 20;

        const response = await request(app)
            .patch(`/courses/pricing/${testCourse._id}`)
            .send({basePrice: SamplebasePrice, tax: SampleTax, finalAmount: SampleFinalAmount, discountType: SampleDiscountType, discountPercent: SampleDiscountPercent, discountAmount: SampleDiscountAmount })

            assert.strictEqual(response.statusCode, 200);  
        assert.strictEqual(response._body.message, 'Course Updated!');  
    });
});
