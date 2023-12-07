const request = require("supertest")
const assert = require("assert")
const app = require("../server");
const Courses = require("../models/courses");
const instructor = require("../models/instructor");

describe("Courses-> General-> delete", () => {
    let testCourse;
    let testInstructor;

    beforeEach(async () => {
        testInstructor = await instructor.create({
            name: "John Doe",
            email: "john@doe.com",
            password: "qqqqq111"
        });
        testCourse = await Courses.create({
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
    })

    afterEach(async () => {
        await Courses.deleteMany();
        await instructor.deleteMany();
    });

    it("Deletes a course", async () => {
      
        const response = await request(app)
            .delete(`/courses/${testCourse._id}`)
    
        assert.strictEqual(response.status, 200); // Check for the correct status code (201 for "Created")
        assert.strictEqual(response.body.message, "Course Deleted!"); // Validate the created student's details
        // Add further assertions based on the expected response structure or details
    });
    

    // it("checks no data condition", async () => {
    //     const response = await request(app)
    //         .get(`/admin/getPcStudents`)
    //     assert.strictEqual(response.status, 200)
    //     assert.strictEqual(response._body, "No Data!")
    // });

})