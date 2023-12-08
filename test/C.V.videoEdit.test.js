const fs = require('fs');
const path = require('path');
const request = require('supertest');
const assert = require('assert');
const app = require('../server'); // Import your server setup
const Instructors = require('../models/instructor')
const courses = require('../models/courses')
const chalk = require('chalk')


describe('Courses-> Videos-> Video Edit', () => {
    let testInstructor;
    let testCourse;
    let newFile;

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
                            path: 'Test_Video copy.mp4'
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

        fs.copyFile(process.env.copyVideo, process.env.destinationVideo, (err) => {
            if (err) {
                console.error('Error duplicating file:', err);
                return;
            }
        });

        // deletionPath = process.env.testVideoDeletionPath + newFile;
        
        fs.unlink(path.join(process.env.testVideoDeletionPath, newFile), (err) => {
            if (err) {
              console.error('Error deleting file:', err);
              return;
            }
            console.log('File deleted successfully:', newFile);
          });
        });

    it('should update video file successfully', async () => {
        // Mock course data
        const sampleVideoTitle = 'sampleVideo.mp4'; // Sample video title
        const sampleVideoPath = process.env.testVideo; // Sample video path
        const videoStream = fs.createReadStream(sampleVideoPath);

        const formData = {
            fileInput: videoStream,
            sectionIndex: '0',
            videoIndex: '0',
        };
        const response = await request(app)
            .patch(`/courses/videoEdit/${testCourse._id}`) // Adjust the endpoint to match your route setup
            .attach('fileInput', videoStream) // Attach the file stream
            .field('sectionIndex', '0')
            .field('videoIndex', '0');

            newFile = response.body.path;
        // Assert the response
        assert.strictEqual(response.status, 200); // Check for successful status code
        assert.strictEqual(response.body.message, 'Updated Video File'); // Check for the expected message
        
        // You can add further assertions based on the response structure or details
    });
});
