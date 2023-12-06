const request = require("supertest")
const assert = require("assert")
const app = require("../server");
const students = require("../models/student");

describe("Create new Student", () => {
    let testStudent;

    afterEach(async () => {
        await students.deleteMany();
    });

    it("Creates a new Student", async () => {
        testStudent = await students.create({
            name: "John Doe",
            email: "john@doe.com",
            password: "qqqqq111"
        });

        const response = await request(app)
            .delete(`/students/${testStudent._id}`)
    
        assert.strictEqual(response.status, 200); // Check for the correct status code (201 for "Created")
        assert.strictEqual(response.body.message, "Student Deleted!"); // Validate the created student's details
        // Add further assertions based on the expected response structure or details
    });
    

    // it("checks no data condition", async () => {
    //     const response = await request(app)
    //         .get(`/admin/getPcStudents`)
    //     assert.strictEqual(response.status, 200)
    //     assert.strictEqual(response._body, "No Data!")
    // });

})