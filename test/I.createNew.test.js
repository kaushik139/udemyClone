const request = require("supertest")
const assert = require("assert")
const app = require("../server");
const Instructor = require("../models/instructor");

describe("Create new instructor", () => {

    afterEach(async () => {
        await Instructor.deleteMany();
    });

    it("Creates a new instructor", async () => {
        const response = await request(app)
            .post(`/instructors/`)
            .send({
                name: "John Doe",
                email: "john@doe.com",
                password: "qqqqq111"
            });
    
        assert.strictEqual(response.status, 201); // Check for the correct status code (201 for "Created")
        assert.strictEqual(response.body.name, "John Doe"); // Validate the created instructor's details
        // Add further assertions based on the expected response structure or details
    });
    

    // it("checks no data condition", async () => {
    //     const response = await request(app)
    //         .get(`/admin/getPcInstructor`)
    //     assert.strictEqual(response.status, 200)
    //     assert.strictEqual(response._body, "No Data!")
    // });

})