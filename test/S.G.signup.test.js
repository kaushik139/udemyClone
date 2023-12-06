const request = require("supertest")
const assert = require("assert")
const app = require("../server");
const students = require("../models/student");

describe("Performs Student SignUp", () => {
    
    afterEach(async () => {
        await students.deleteMany();
    });

    it("Simulates Signup ", async () => {

        const response = await request(app)
            .post(`/students/newSignup`)
            .send({name: 'John Doe',
                email: "john@doe.com",
        password: "qqqqq111"})
    
        assert.strictEqual(response.status, 201); // Check for the correct status code (201 for "Created")
        assert.strictEqual(response.body.message, 'New Student Signup!'); // Validate the created student's details
        // Add further assertions based on the expected response structure or details
    });
    

    it("checks no data condition", async () => {
        const response = await request(app)
        .post(`/students/newSignup`)
        assert.strictEqual(response.status, 400)
        assert.strictEqual(response._body.message, 'student validation failed: name: Path `name` is required., email: Path `email` is required., password: Path `password` is required.')
    });

})