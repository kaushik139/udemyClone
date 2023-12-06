const request = require("supertest")
const assert = require("assert")
const app = require("../server");
const students = require("../models/student");
const courses = require("../models/courses");

describe("gets all Students", () => {
    let testStudent;
    let testStudent1;
    beforeEach(async () => {
       
    });

    afterEach(async () => {
        await students.deleteMany();
        await courses.deleteMany();
    });

    it("fetches all Students", async () => {
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
            .get(`/admin/getAllStudents`)
        assert.strictEqual(response.status, 200)
        assert.strictEqual(response._body.length, 2)

    });

    it("checks no data condition", async () => {
        const response = await request(app)
            .get(`/admin/getAllStudents`)
        assert.strictEqual(response.status, 200)
        assert.strictEqual(response._body, "No Data!")
    });

})