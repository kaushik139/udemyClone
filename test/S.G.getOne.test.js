const request = require("supertest")
const assert = require("assert")
const app = require("../server");
const students = require("../models/student");
const instructor = require("../models/instructor");

describe("Fetches Student through Email", () => {
    let testStudent;
    let testStudent1;
    let testInstructor;
    let testInstructor1;

    afterEach(async () => {
        await students.deleteMany();
        await instructor.deleteMany();
    });

    it("Get Student ", async () => {
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

        const response = await request(app)
            .post(`/students/${testStudent.email}`)
        .send({role: 'students'})
    
        assert.strictEqual(response.status, 200); // Check for the correct status code (201 for "Created")
        assert.strictEqual(response.body.user.name, testStudent.name); // Validate the created student's details
        // Add further assertions based on the expected response structure or details
    });

    it("Get Instructor", async () => {
        testInstructor = await instructor.create({
            name: "John Doe I",
            email: "ijohn@doe.com",
            password: "qqqqq111"
        });
        testInstructor1 = await instructor.create({
            name: "John Doe 2 I",
            email: "ijohn@doe2.com",
            password: "qqqqq222"
        });
        
        const response = await request(app)
            .post(`/students/${testInstructor.email}`)
        .send({role: 'instructors'})
    
        assert.strictEqual(response.status, 200); // Check for the correct status code (201 for "Created")
        assert.strictEqual(response.body.user.name, testInstructor.name); // Validate the created student's details
        // Add further assertions based on the expected response structure or details
    });
    

    it("checks no data condition", async () => {
        const response = await request(app)
        .post(`/students/${123}`)
        assert.strictEqual(response.status, 404)
        assert.strictEqual(response._body, "Missing Data!")
    });

})