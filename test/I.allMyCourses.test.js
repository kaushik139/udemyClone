const request = require("supertest")
const assert = require("assert")
const app = require("../server");
const Instructors = require("../models/instructor");
const courses = require("../models/courses");

describe("Get All Courses created by an Instructor", () => {
    let testInstructor;
    let testCourse;
    let testCourse2;
    const randomEmail = 'a@a.com';

    afterEach(async () => {
        await Instructors.deleteMany();
        await courses.deleteMany();
    });

    it("Get All courses by an Instructor", async () => {
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
            stripeProductID: 'sample_stripe_product_id',
            stripePriceID: 'sample_stripe_price_id',
            status: 'published',
        });
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

        const response = await request(app)
            .get(`/instructors/allMyCourses/${testInstructor.email}`)
    
        assert.strictEqual(response.status, 202); // Check for the correct status code (201 for "Created")
        assert.strictEqual(response.body.length, 0); // Validate the created student's details
        // Add further assertions based on the expected response structure or details
    });
    

    it("checks no data condition", async () => {
        const response = await request(app)
            .get(`/instructors/allMyCourses/${randomEmail}`)
        assert.strictEqual(response.status, 400)
        assert.strictEqual(response._body, 'User not Found')
    });

})