const request = require("supertest")
const assert = require("assert")
const app = require("../server");
const Instructors = require("../models/instructor");

describe("Fetches Instructor through Email", () => {
   
    let testInstructor;
    let testInstructor1;

    afterEach(async () => {
        await Instructors.deleteMany();
    });

    it("Get Instructor ", async () => {
        testInstructor = await Instructors.create({
            name: "John Doe",
            email: "john@doe.com",
            password: "qqqqq111"
        });
        testInstructor1 = await Instructors.create({
            name: "John Doe 2",
            email: "john@doe2.com",
            password: "qqqqq222"
        });

        const response = await request(app)
            .get(`/instructors/${testInstructor._id}`)
    
        assert.strictEqual(response.status, 200); // Check for the correct status code (201 for "Created")
        assert.strictEqual(response._body.name, testInstructor.name); // Validate the created Instructor's details
        // Add further assertions based on the expected response structure or details
    });
    

    // it("checks no data condition", async () => {
    //     const response = await request(app)
    //     .post(`/instructors/${123}`)
    //     assert.strictEqual(response.status, 404)
    //     assert.strictEqual(response._body, "Missing Data!")
    // });

})