const fs = require('fs');
const path = require('path');
const request = require('supertest');
const assert = require('assert');
const mongoose = require('mongoose');
const app = require('../server');
const chalk = require('chalk');
const courses = require('../models/courses');
const Instructors = require("../models/instructor");

describe('Courses-> General-> BG Image Upload', () => {
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
                    exercises: [{
                        title: 'Sample Title',
                        file: '',
                    }],
                    sectionDesctiption: 'Sample Description',
                    sectionTitle: 'Section 123',
                    videos: [
                        {
                            title: 'title',
                            path: 'path'
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

    it('uploads BG Images for course', async () => {
        const sampleFileName = 'TestImage.jpg'
        const sampleFilePath = process.env.testImage; // Replace with the path to your file
        const fileStream = fs.createReadStream(sampleFilePath);

        const formData = {
            fileInput: fileStream,
        };
        const response = await request(app)
            .patch(`/courses/landingPageImage/${testCourse._id}`) // Adjust the endpoint to match your route setup
            .attach('fileInput', fileStream) // Attach the file stream
        
        assert.strictEqual(response.statusCode, 200);
        assert.strictEqual(response.body.message, 'Updated');

        // Add more assertions as needed
    });

    // Add more test cases to cover different scenarios
});
