const request = require("supertest")
const assert = require("assert")
const app = require("../server");
const instructor = require("../models/instructor");
const students = require("../models/student");
const courses = require("../models/courses");

describe("gets Dashboard Overview Data for Admins", () => {
    let testInstructor;
    let testInstructor1;
    let testStudent;
    let testStudent1;
    beforeEach(async () => {
       
    });

    afterEach(async () => {
        await students.deleteMany();
        await instructor.deleteMany();
        await courses.deleteMany();
    });

    it("fetches Overview data for Admin", async () => {
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
            .get(`/admin/overview`)
        assert.strictEqual(response.status, 200)
        assert.deepStrictEqual(response._body.cMonth, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        assert.deepStrictEqual(response._body.iMonth, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2]);
        assert.deepStrictEqual(response._body.sMonth, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2]);
        assert.deepStrictEqual(response._body.pcInstructors, 1);
        assert.deepStrictEqual(response._body.pcStudents, 1);
        assert.deepStrictEqual(response._body.pcStudents, 1);
        assert.deepStrictEqual(response._body.totalCourses, 1);
        assert.deepStrictEqual(response._body.totalInstructors, 2);
        assert.deepStrictEqual(response._body.totalStudents, 2);
        assert.deepStrictEqual(response._body.requests, []);


    });

    it("checks no data condition", async () => {
        const response = await request(app)
            .get(`/admin/overview`)
            assert.strictEqual(response.status, 200)
            assert.deepStrictEqual(response._body.cMonth, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
            assert.deepStrictEqual(response._body.iMonth, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
            assert.deepStrictEqual(response._body.sMonth, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
            assert.deepStrictEqual(response._body.pcInstructors, 0);
            assert.deepStrictEqual(response._body.pcStudents, 0);
            assert.deepStrictEqual(response._body.pcStudents, 0);
            assert.deepStrictEqual(response._body.totalCourses, 0);
            assert.deepStrictEqual(response._body.totalInstructors, 0);
            assert.deepStrictEqual(response._body.totalStudents, 0);
            assert.deepStrictEqual(response._body.requests, []);
    });

})