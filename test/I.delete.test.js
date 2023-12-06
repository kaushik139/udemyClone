const request = require("supertest")
const assert = require("assert")
const app = require("../server");
const Instructors = require("../models/instructor");

describe("Create new instructor", () => {
    let testinstructor;

    afterEach(async () => {
        await Instructors.deleteMany();
    });

    it("Creates a new instructor", async () => {
        testinstructor = await Instructors.create({
            name: "John Doe",
            email: "john@doe.com",
            password: "qqqqq111"
        });

        const response = await request(app)
            .delete(`/instructors/${testinstructor._id}`)
    
        assert.strictEqual(response.status, 200); // Check for the correct status code (201 for "Created")
        assert.strictEqual(response.body.message, "Instructor Deleted!"); // Validate the created instructors's details
        // Add further assertions based on the expected response structure or details
    });
    

    // it("checks no data condition", async () => {
    //     const response = await request(app)
    //         .get(`/admin/getPcInstructors`)
    //     assert.strictEqual(response.status, 200)
    //     assert.strictEqual(response._body, "No Data!")
    // });

})