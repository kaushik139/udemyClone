const request = require("supertest")
const assert = require("assert")
const app = require("../server");
const instructor = require("../models/instructor");
const courses = require("../models/courses");

describe("gets all Instructors", () => {
    let testInstructor;
    let testInstructor1;
    let testCourses;
    beforeEach(async () => {
       
    });

    afterEach(async () => {
        await instructor.deleteMany();
        await courses.deleteMany();
    });

    it("fetches all instructors", async () => {
        testInstructor = await instructor.create({
            name: "John Doe",
            email: "john@doe.com",
            password: "qqqqq111"
        });
        testInstructor1 = await instructor.create({
            name: "John Doe 2",
            email: "john@doe2.com",
            password: "qqqqq222"
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

        const response = await request(app)
            .get(`/admin/getAllInstructors`)
        assert.strictEqual(response.status, 200)
        assert.strictEqual(response._body.length, 2)
        assert.strictEqual(response._body[0].publishedCourses, 1)
        assert.strictEqual(response._body[0].unpublishedCourses, 0)
        assert.strictEqual(response._body[1].publishedCourses, 0)
        assert.strictEqual(response._body[1].unpublishedCourses, 0)
        // assert.strictEqual(response._body, 0)

    });

    it("checks no data condition", async () => {
        const response = await request(app)
            .get(`/admin/getAllInstructors`)
        assert.strictEqual(response.status, 200)
        assert.strictEqual(response._body, "No Data!")
    });

})