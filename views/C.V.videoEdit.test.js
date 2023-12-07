const fs = require('fs');
const request = require('supertest');
const assert = require('assert');
const app = require('../server'); // Import your server setup
const Instructors = require('../models/instructor')
const courses = require('../models/courses')

describe('Courses-> Videos-> Video Edit', () => {
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
                            title: 'abc',
                            path: 'path123.mkv'
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

    it('should update video file successfully', async () => {
        // Mock course data
        const sampleSectionIndex = 0; // Sample section index
        const sampleVideoIndex = 0; // Sample video index
        const sampleVideoTitle = 'Sample Video'; // Sample video title
        const sampleVideoPath = 'sampleVideo.mp4'; // Sample video path

        // Mock the request to simulate the controller
        const response = await request(app)
            .patch(`/courses/videoEdit/${testCourse._id}`)
            .send({
                sectionIndex: sampleSectionIndex,
                videoIndex: sampleVideoIndex,
                videoTitle: sampleVideoTitle,
                path: sampleVideoPath,
                filename: sampleVideoPath,
            });

        // Assert the response
        assert.strictEqual(response.status, 200); // Check for successful status code
        assert.strictEqual(response.body.message, 'Video Updated!'); // Check for the expected message

        // You can add further assertions based on the response structure or details
    });
});
