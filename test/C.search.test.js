const request = require('supertest');
const assert = require('assert');
const mongoose = require('mongoose');
const app = require('../server'); // Import your server setup
const courses = require('../models/courses');
const Instructors = require("../models/instructor");

describe('Course->Search->search', () => {
    let testInstructor;
    let testCourse;
    let testCourse2;
    let testCourse3;

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
            stripeProductID: 'sample_stripe_product_id',
            stripePriceID: 'sample_stripe_price_id',
            status: 'published',
        });
        testCourse2 = await courses.create({
            title: 'Sample Course II',
            description: {
                miniDescription: 'Short description for the sample course II',
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
            status: 'published',
        });
        testCourse3 = await courses.create({
            title:'Course III',
            description: {
                miniDescription: 'Short description for the sample Lecture',
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
            status: 'published',
        });
    });

    afterEach(async () => {
        await courses.deleteMany();
    });

    it('Searches courses by title', async () => {        
        const searchText = 'sam';
        const response = await request(app)
            .get(`/courses/search/${searchText}`)

            assert.strictEqual(response.statusCode, 200);  
            assert.strictEqual(response._body.processedResults.length, 2);  
    });

    // Add more test cases to cover different scenarios
});
