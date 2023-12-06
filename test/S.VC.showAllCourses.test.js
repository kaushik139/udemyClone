const request = require("supertest")
const assert = require("assert")
const app = require("../server");
const students = require("../models/student");
const courses = require("../models/courses");

describe("Fetches all Courses in a paginated way for students", () => {
    let testStudent;
    let testCourses
    beforeEach(async () => {
        testStudent = await students.create({
            name: "John Doe",
            email: "john@doe.com",
            password: "qqqqq111"
        });
        testCourses = await courses.create({
            title: 'Sample Course',
            description: {
                miniDescription: 'Short description for the sample course',
            },
            instructor: "656455a661b344fdc0c674ab",
            category: 'Sample Category',
            price: {
                basePrice: 100,
                tax: 10,
                finalAmount: 110,
            },
            stripeProductID: 'prod_P5AhNNvLkyNOTK',
            stripePriceID: 'price_1OH0X0SGd2aGMYHQFM2euDCC',
            status: 'published',
        });
    })
    afterEach(async () => {
        await students.deleteMany();
        await courses.deleteMany();
    });

    it("Get Student ", async () => {


        const response = await request(app)
            .get(`/students/showAllCourses/${0}`)
            .send({ role: 'students' })
        // console.log(response)
        assert.strictEqual(response.status, 200); // Check for the correct status code (201 for "Created")
        assert.strictEqual(response._body[0].title, testCourses.title); // Validate the created student's details
        // Add further assertions based on the expected response structure or details
    });

})