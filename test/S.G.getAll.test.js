const request = require("supertest")
const assert = require("assert")
const app = require("../server");
const students = require("../models/student");

describe("Get All Students", () => {
    let testStudent;
    let testStudent1;

    afterEach(async () => {
        await students.deleteMany();
    });

    it("Get All", async () => {
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
            .get(`/students/`)
    
        assert.strictEqual(response.status, 200); // Check for the correct status code (201 for "Created")
        assert.strictEqual(response.body.length, 2); // Validate the created student's details
        // Add further assertions based on the expected response structure or details
    });
    

    // it("checks no data condition", async () => {
    //     const response = await request(app)
    //         .get(`/admin/getPcStudents`)
    //     assert.strictEqual(response.status, 200)
    //     assert.strictEqual(response._body, "No Data!")
    // });

})