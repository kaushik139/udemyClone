const request = require("supertest");
const assert = require("assert");
const app = require("../server");
const courses = require("../models/courses");
const instructor = require("../models/instructor");


describe("get all unpublished Course", () => {
    let testCourse;
    let testInstructor
    beforeEach(async () => {
         
    });

    afterEach(async () => {
        await courses.deleteMany();
        await instructor.deleteMany();
    });

    it("fetches unpublished course(s)", async () => {

        testInstructor = await instructor.create({
            name: "John Doe",
            email: "john@doe.com",
            password: "qqqqq111"
        })
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
            status: 'draft',
        });


        const response = await request(app)
            .get(`/admin/getUnpublishedCourses`)

        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.body[0].title, 'Sample Course');
    });

    it("checks on data condition", async () => {
        
        testInstructor = await instructor.create({
            name: "John Doe",
            email: "john@doe.com",
            password: "qqqqq111"
        })
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
            .get(`/admin/getUnpublishedCourses`)

        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.body[0].title, undefined);
    });
});
