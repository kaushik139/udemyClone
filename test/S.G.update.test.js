const request = require("supertest");
const assert = require("assert");
const app = require("../server");
const students = require("../models/student");

describe("Controller Tests", () => {
    let testStudent;

    beforeEach(async () => {
        // Create a test student for each test case
        testStudent = await students.create({
            name: "John Doe",
            email: "john@doe.com",
            password: "qqqqq111",
        });
    });

    afterEach(async () => {
        await students.deleteMany();
    });

    it("Updates student's name only", async () => {
        const newName = "Jane Smith";

        const response = await request(app)
            .patch(`/students/${testStudent._id}`)
            .send({ name: newName });

        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.body.message, "Updated!");

        const updatedStudent = await students.findById(testStudent._id);
        assert.strictEqual(updatedStudent.name, newName);
        // Ensure other fields remain unchanged (like profileImage)
        assert.strictEqual(updatedStudent.profileImage, "");
    });

    // Add more test cases to cover various scenarios and edge cases
});
