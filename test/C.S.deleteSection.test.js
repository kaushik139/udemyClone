const request = require('supertest');
const assert = require('assert');
const mongoose = require('mongoose');
const app = require('../server'); // Import your server setup
const courses = require('../models/courses');
const Instructors = require("../models/instructor");

describe('Courses->Sections->Delete Section', () => {
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

    it('deletes existing section in a course', async () => {        
        const response = await request(app)
            .delete(`/courses/deleteSection/${testCourse._id}`)
        .send({index: 0})

            assert.strictEqual(response.statusCode, 200);  
            assert.strictEqual(response._body.message, 'Section Deleted!');  
            assert.ok(!response._body.updatedCourse?.sections, 'Sections should not exist');


                });

    // Add more test cases to cover different scenarios
});
