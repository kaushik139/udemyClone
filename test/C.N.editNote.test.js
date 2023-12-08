const request = require('supertest');
const assert = require('assert');
const mongoose = require('mongoose');
const app = require('../server'); // Import your server setup
const courses = require('../models/courses');
const Instructors = require("../models/instructor");

describe('Courses->Notes->Edit Note', () => {
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
                    videos: [
                        {
                            title: 'video Title',
                            notes: [
                                {
                                    id: '6564554f61b344fdc0c6749f',
                                    note: 'Sample Note',
                                }
                            ],
                        }
                    ],
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

    it('Edits a note in a course', async () => {        
        const response = await request(app)
            .post(`/courses/editNotes/${testCourse._id}`)
        .send({sectionIndex: '0', viewType: 'videos', viewIndex: 0, id: '6564554f61b344fdc0c6749f', noteID: testCourse.sections[0].videos[0].notes[0]._id, note: 'updated note'})

            assert.strictEqual(response.statusCode, 200);  
            assert.strictEqual(response._body, 'Note Edited');  
    });

    // Add more test cases to cover different scenarios
});
