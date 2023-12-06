const request = require('supertest');
const assert = require('assert');
const mongoose = require('mongoose');
const app = require('../server'); // Import your server setup
const courses = require('../models/courses');
const Instructors = require('../models/instructor');

describe('Controller Tests', () => {
    before(async () => {
        // Connect to a testing database or setup a way to handle test data
        // ...
    });

    after(async () => {
        // Clean up after tests (delete test data, close connections, etc.)
        // ...
    });

    it('Searches courses by title', async () => {
        // Create test data for courses and instructors
        const testInstructor = await Instructors.create({
            name: 'John Doe',
            email: 'john@example.com', // Add an email field here
        });
        
        const searchText = 'sam';

        testCourse = await courses.create({
            title: 'Sample Course II',
            description: {
                miniDescription: 'Short description for the sample course',
            },
            instructor: '656455a661b344fdc0c674ab', // Replace with an existing instructor ID
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

        const req = {
            params: {
                text: 'Sample', // Search text
            },
        };

        const res = {
            statusCode: 0,
            body: null,
            status: function(code) {
                this.statusCode = code;
                return this;
            },
            json: function(data) {
                this.body = data;
            },
        };

        const response = await request(app)
            .get(`/search/${searchText}`)

        assert.strictEqual(res.statusCode, 200);
        assert(Array.isArray(res.body.processedResults));
        assert.notStrictEqual(res.body.processedResults.length, 0);

        const firstResult = res.body.processedResults[0];
        assert(Object.prototype.hasOwnProperty.call(firstResult, 'id'));
        assert(Object.prototype.hasOwnProperty.call(firstResult, 'title'));
        assert(Object.prototype.hasOwnProperty.call(firstResult, 'instructor'));

        // Add more assertions as needed
    });

    // Add more test cases to cover different scenarios
});
