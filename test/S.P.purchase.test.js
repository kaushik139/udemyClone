const request = require("supertest");
const assert = require("assert");
const app = require("../server");
const sinon = require("sinon");
const courses = require("../models/courses");
const stripe = require("stripe");
const student = require("../models/student");

describe("Stripe Checkout Controller", () => {
    let course;
    let stripeCheckoutStub;
    let testCourses
    let testStudent;
    beforeEach(async () => {
        course = {
            _id: "test_course_id",
            stripePriceID: "test_stripe_price_id",
        };
        testStudent = await student.create({
            name: "John Doe",
            email: "john@doe.com",
            password: "qqqqq111",
        });
        testCourses = await courses.create({
            title: 'Sample Course',
            description: {
                miniDescription: 'Short description for the sample course',
            },
            instructor: "656455a661b344fdc0c674ab", // Replace with an existing instructor ID
            category: 'Sample Category',
            price: {
                basePrice: 100,
                tax: 10,
                finalAmount: 110,
            },
            stripeProductID: 'prod_P5AhNNvLkyNOTK',
            stripePriceID: 'price_1OH0X0SGd2aGMYHQFM2euDCC',
            status: 'draft',
        });

        // Initialize the stripe object with the secret key
        // const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);
        // stripeCheckoutStub = sinon.stub(stripeInstance.checkout.sessions, "create");
    });

    afterEach(async () => {
        // sinon.restore();
        await courses.deleteMany()
        await student.deleteMany()
    });

    it("Creates a Stripe checkout session successfully", async () => {
        const response = await request(app)
            .post(`/students/purchase/${testStudent._id}`)
            .send({ courseID: testCourses._id });
        // console.log(response)
        assert.strictEqual(response.status, 200)
        assert.strictEqual(typeof response._body.url, 'string');
        // assert.strictEqual(, 200)
        // const sessionData = {
        //     url: "test_checkout_url",
        // };

        // stripeCheckoutStub.resolves(sessionData);

        // const response = await request(app)
        //     .post("/checkout")
        //     .send({
        //         courseID: course._id,
        //     });

        // assert.strictEqual(response.status, 404);
        // assert.deepStrictEqual(response.body, {});

        // sinon.assert.calledOnce(stripeCheckoutStub);
        // sinon.assert.calledWithExactly(stripeCheckoutStub, {
        //     // ... (rest of your assertions)
        // });
    });

    // Add more test cases
});
