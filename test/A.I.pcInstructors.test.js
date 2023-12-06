const request = require("supertest")
const assert = require("assert")
const app = require("../server");
const instructor = require("../models/instructor");
const courses = require("../models/courses");

describe("gets all Instructors with published Courses", () => {
    let testInstructor;
    let testInstructor1;
    let testCourses;
    beforeEach(async () => {
       
    });

    afterEach(async () => {
        await instructor.deleteMany();
        await courses.deleteMany();
    });

    it("fetches all Instructors with published Courses", async () => {
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
        testCourses = await courses.create({
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
        await instructor.findOneAndUpdate(
            { _id: testInstructor._id }, // Filter by instructor ID
            {
              $push: {
               courses: testCourses._id
              },
            },
            { new: true } // Options: return the updated document
          );

        const response = await request(app)
            .get(`/admin/getPcInstructors`)
        assert.strictEqual(response.status, 200)
        assert.strictEqual(response._body.length, 1)
        assert.strictEqual(response._body[0].publishedCourses, 1);
        assert.strictEqual(response._body[0].name, testInstructor.name);

    });

    it("checks no data condition", async () => {
        const response = await request(app)
            .get(`/admin/getPcInstructors`)
        assert.strictEqual(response.status, 200)
        assert.strictEqual(response._body, "No Data!")
    });

})