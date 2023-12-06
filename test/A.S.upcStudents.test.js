const request = require("supertest")
const assert = require("assert")
const app = require("../server");
const students = require("../models/student");
const courses = require("../models/courses");

describe("gets all Students", () => {
    let testStudent;
    let testStudent1;
    beforeEach(async () => {
       
    });

    afterEach(async () => {
        await students.deleteMany();
        await courses.deleteMany();
    });

    it("fetches all Students", async () => {
        testStudent = await students.create({
            name: "John Doe",
            email: "john@doe.com",
            password: "qqqqq111"
        });
        testStudent1 = await students.create({
            name: "John Doe 2",
            email: "john@doe2.com",
            password: "qqqqq222"
        });
        testCourses = await courses.create({
            title: 'Sample Course',
            description: {
                miniDescription: 'Short description for the sample course',
            },
            instructor: testStudent._id, // Replace with an existing instructor ID
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
        await students.findOneAndUpdate(
            { _id: testStudent._id }, // Filter by instructor ID
            {
              $push: {
                    purchasedCourse: {
                        courseCode: testCourses._id
                }
              },
            },
            { new: true } // Options: return the updated document
          );

        const response = await request(app)
            .get(`/admin/getUpcStudents`)
        assert.strictEqual(response.status, 200)
        assert.strictEqual(response._body.length, 1)

    });

    it("checks no data condition", async () => {
        const response = await request(app)
            .get(`/admin/getUpcStudents`)
        assert.strictEqual(response.status, 200)
        assert.strictEqual(response._body, "No Data!")
    });

})