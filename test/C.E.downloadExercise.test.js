const request = require('supertest');
const assert = require('assert');
const mongoose = require('mongoose');
const app = require('../server');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const courses = require('../models/courses');
const Instructors = require("../models/instructor");

describe('Courses-> Exercises-> Download Exercises', () => {
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
                        file: '20231128042621715HTML.txt',
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

    it('Downloads a file', async () => {
        const testFileName = '20231128042621715HTML.txt';
        const response = await request(app)
            .get(`/courses/exerciseDownload/${testFileName}`); // Adjust the endpoint to match your route setup

        assert.strictEqual(response.statusCode, 200);
        assert.strictEqual(response.header['content-disposition'], `attachment; filename="HTML.txt"`);
        assert.strictEqual(response.header['content-type'], 'text/plain; charset=UTF-8');

  
    });

});
