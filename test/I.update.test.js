const request = require("supertest");
const assert = require("assert");
const app = require("../server");
const Instructors = require("../models/instructor");

describe("Controller Tests", () => {
    let testinstructor;

    beforeEach(async () => {
        // Create a test instructor for each test case
        testinstructor = await Instructors.create({
            name: "John Doe",
            email: "john@doe.com",
            password: "qqqqq111",
        });
    });

    afterEach(async () => {
        await Instructors.deleteMany();
    });

    it("Updates instructor's name only", async () => {
        const newName = "Jane Smith";

        const response = await request(app)
            .patch(`/Instructors/${testinstructor._id}`)
            .send({ name: newName });

        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.body.message, "Updated!");

        const updatedinstructor = await Instructors.findById(testinstructor._id);
        assert.strictEqual(updatedinstructor.name, newName);
        // Ensure other fields remain unchanged (like profileImage)
        assert.strictEqual(updatedinstructor.profileImage, "");
    });

    // Add more test cases to cover various scenarios and edge cases
});
