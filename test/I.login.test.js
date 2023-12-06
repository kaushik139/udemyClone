const request = require("supertest")
const assert = require("assert")
const app = require("../server");
const Instructors = require("../models/instructor");

describe("Performs Instructor Login", () => {
    let testInstructor;
    let testInstructor1;

    afterEach(async () => {
        await Instructors.deleteMany();
    });

    it("Get Instructor", async () => {
        testInstructor = await Instructors.create({
            name: "John Doe I",
            email: "ijohn@doe.com",
            password: "qqqqq111"
        });
        testInstructor1 = await Instructors.create({
            name: "John Doe 2 I",
            email: "ijohn@doe2.com",
            password: "qqqqq222"
        });
        
        const response = await request(app)
            .post(`/instructors/login`)
        .send({ email: "ijohn@doe.com",
        password: "qqqqq111"})
    
        assert.strictEqual(response.status, 202); // Check for the correct status code (201 for "Created")
        assert.strictEqual(response.body.name, testInstructor.name); // Validate the created student's details
        // Add further assertions based on the expected response structure or details
    });

    it("simulates wrong Password", async () => {
        testInstructor = await Instructors.create({
            name: "John Doe I",
            email: "ijohn@doe.com",
            password: "qqqqq111"
        });
        
        const response = await request(app)
            .post(`/instructors/login`)
        .send({ email: "ijohn@doe.com",
        password: "qqqqq11"})
    
        assert.strictEqual(response.status, 401); // Check for the correct status code (201 for "Created")
        assert.strictEqual(response.body.message, 'Password Incorrect'); // Validate the created student's details
        // Add further assertions based on the expected response structure or details
    });

    it("simiulates wrong email", async () => {
        testInstructor = await Instructors.create({
            name: "John Doe I",
            email: "ijohn@doe.com",
            password: "qqqqq111"
        });
        
        const response = await request(app)
            .post(`/instructors/login`)
        .send({ email: "iohn@doe.com",
        password: "qqqqq111"})
    
        assert.strictEqual(response.status, 404); // Check for the correct status code (201 for "Created")
        assert.strictEqual(response.body.message, 'User not Exists!'); // Validate the created student's details
        // Add further assertions based on the expected response structure or details
    });
    

    it("checks no data condition", async () => {
        const response = await request(app)
        .post(`/instructors/login`)
        assert.strictEqual(response.status, 404)
        assert.strictEqual(response._body.message, 'User not Exists!')
    });

})