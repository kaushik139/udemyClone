const request = require("supertest")
const assert = require("assert")
const app = require("../server");
const students = require("../models/student");

describe("Create new Student", () => {

    afterEach(async () => {
        await students.deleteMany();
    });

    it("Creates a new Student", async () => {
        const response = await request(app)
            .post(`/students/`)
            .send({
                name: "John Doe",
                email: "john@doe.com",
                password: "qqqqq111"
            });
    
        assert.strictEqual(response.status, 201); // Check for the correct status code (201 for "Created")
        assert.strictEqual(response.body.name, "John Doe"); // Validate the created student's details
        // Add further assertions based on the expected response structure or details
    });
    

    // it("checks no data condition", async () => {
    //     const response = await request(app)
    //         .get(`/admin/getPcStudents`)
    //     assert.strictEqual(response.status, 200)
    //     assert.strictEqual(response._body, "No Data!")
    // });

})