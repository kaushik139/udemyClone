const request = require('supertest');
const assert = require('assert');
const mongoose = require('mongoose');
const app = require('../server'); // Import your server setup
const courses = require('../models/courses');
const Instructors = require("../models/instructor");

describe('Courses->Exercises->Create Exercise', () => {
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

    it('Creates new exercise in a course with a file', async () => {  
        const sampleDescription = 'sample exercise';
        const sampleIndex = 0;
        const sampleFilePath = 'file-path.mkv'
        const sampleTitle = 'Ex 123';

        const response = await request(app)
            .patch(`/courses/createExercise/${testCourse._id}`)
            .send({title: sampleTitle, description: sampleDescription, index: sampleIndex, filePath: sampleFilePath})

            assert.strictEqual(response.statusCode, 200);  
        assert.strictEqual(response._body.message, 'Exercise Added');  
        assert.strictEqual(response._body.course.sections[0].exercises[0].title, sampleTitle);  
        assert.strictEqual(response._body.course.sections[0].exercises[0].filePath, sampleFilePath);  
    });

    it('Creates new exercise in a course without a file', async () => {  
        const sampleDescription = 'sample exercise';
        const sampleIndex = 0;
        const sampleFilePath = ''
        const sampleTitle = 'Ex 123';

        const response = await request(app)
            .patch(`/courses/createExercise/${testCourse._id}`)
        .send({title: sampleTitle, description: sampleDescription, index: sampleIndex, filePath: sampleFilePath})

            assert.strictEqual(response.statusCode, 200);  
            assert.strictEqual(response._body.message, 'Exercise Added');  
            assert.strictEqual(response._body.course.sections[0].exercises[0].title, sampleTitle);  
            assert.strictEqual(response._body.course.sections[0].exercises[0].filePath, '');  
    });

    // Add more test cases to cover different scenarios
});
