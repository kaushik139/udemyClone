const request = require("supertest")
const assert = require("assert")
const app = require("../server");
const Instructors = require("../models/instructor");

describe("Get All Instructors", () => {
    let testinstructor;
    let testinstructor1;

    afterEach(async () => {
        await Instructors.deleteMany();
    });

    it("Get All", async () => {
        testinstructor = await Instructors.create({
            name: "John Doe",
            email: "john@doe.com",
            password: "qqqqq111"
        });
        testinstructor1 = await Instructors.create({
            name: "John Doe 2",
            email: "john@doe2.com",
            password: "qqqqq222"
        });
        const response = await request(app)
            .get(`/instructors/`)
    
        assert.strictEqual(response.status, 200); // Check for the correct status code (201 for "Created")
        assert.strictEqual(response.body.length, 2); // Validate the created instructor's details
        // Add further assertions based on the expected response structure or details
    });
    

    // it("checks no data condition", async () => {
    //     const response = await request(app)
    //         .get(`/admin/getPcInstructors`)
    //     assert.strictEqual(response.status, 200)
    //     assert.strictEqual(response._body, "No Data!")
    // });

})