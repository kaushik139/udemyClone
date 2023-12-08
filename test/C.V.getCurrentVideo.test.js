const fs = require('fs');
const path = require('path');
const request = require('supertest');
const assert = require('assert');
const mongoose = require('mongoose');
const app = require('../server'); // Import your server setup
const courses = require('../models/courses');
const Instructors = require("../models/instructor");

describe('Courses->Videos->Get current Video', () => {
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
                    videos: [
                        {
                            title: 'video 1',
                            path: '20231026095951620SampleVideo2.mp4'
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

    it('should return a specific range of video bytes', (done) => {
        const videoFilePath = process.env.testVideo; // Replace with your video file path
        const fileSize = fs.statSync(videoFilePath).size;

        const rangeStart = 0; // Specify the range start
        const rangeEnd = Math.min(fileSize - 1, rangeStart + 1000000); // Specify the range end
        
        const response = request(app)
            .get(`courses/getCurrentVideo/${path.basename(videoFilePath)}`)
            .set('Range', `bytes=${rangeStart}-${rangeEnd}`)
            // .expect('Content-Type', 'video/mp4')
            // .expect('Content-Range', `bytes ${rangeStart}-${rangeEnd}/${fileSize}`)
            // .expect(206) // Expect a partial content response
            assert.strictEqual(response, 206); // Check for a successful partial content status code
            // .end((err, res) => {
            //     if (err) return done(err);
            //     // Additional assertions or checks if needed
            //     done();
            // });
    });

    // it('should return a specific range of video bytes', async () => {
    //     const sampleVideoTitle = 'sampleVideo.mp4'; // Replace with your actual video title
    //     const response = await request(app)
    //         .get(`/courses/videos/${sampleVideoTitle}`)
    //         .set('Range', 'bytes=0-100'); // Adjust the range as needed
    
    //     // Log headers and body for debugging
    //     console.log('Headers:', response.headers);
    //     console.log('Body:', response.body);
    
    //     assert.strictEqual(response, 206); // Check for a successful partial content status code
    //     // assert.strictEqual(response.headers['content-type'], 'video/mp4'); // Check the Content-Type header
    // });
    


    // Add more test cases to cover different scenarios
});
