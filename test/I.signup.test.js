const request = require("supertest")
const assert = require("assert")
const app = require("../server");
const Instructors = require("../models/instructor");

describe("Performs instructor SignUp", () => {
    
    afterEach(async () => {
        await Instructors.deleteMany();
    });

    it("Simulates Signup ", async () => {

        const response = await request(app)
            .post(`/instructors/newSignup`)
            .send({name: 'John Doe',
                email: "john@doe.com",
        password: "qqqqq111"})
    
        assert.strictEqual(response.status, 201); // Check for the correct status code (201 for "Created")
        assert.strictEqual(response._body.message, 'New Instructor Signup!'); // Validate the created instructor's details
        // Add further assertions based on the expected response structure or details
    });
    

    it("checks no data condition", async () => {
        const response = await request(app)
        .post(`/instructors/newSignup`)
        assert.strictEqual(response.status, 400)
        assert.strictEqual(response._body.message, 'instructor validation failed: email: Path `email` is required.')
    });

})