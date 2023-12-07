const request = require("supertest")
const assert = require("assert")
const app = require("../server");
const Instructors = require("../models/instructor");
const Courses = require("../models/courses");

describe("Courses-> General-> getOne", () => {
    let testCourse;
    let testCourse2;
    let testinstructor;

    afterEach(async () => {
        await Instructors.deleteMany();
    });

    it("Gets One Courses by ID", async () => {
        testinstructor = await Instructors.create({
            name: "John Doe",
            email: "john@doe.com",
            password: "qqqqq111"
        });
        testCourse = await Courses.create({
            title: 'Sample Course',
            description: {
                miniDescription: 'Short description for the sample course',
            },
            instructor: testinstructor._id, // Replace with an existing instructor ID
            category: 'Sample Category',
            price: {
                basePrice: 100,
                tax: 10,
                finalAmount: 110,
            },
            sections: [
                {
                    exercises: [{
                        title: 'Sample Title',
                        file: '',
                    }],
                    sectionDesctiption: 'Sample Description',
                    sectionTitle: 'Section 123',
                    videos: [
                        {
                            title: 'title',
                            path: 'path'
                        }
                    ]
                }
            ],
            stripeProductID: 'sample_stripe_product_id',
            stripePriceID: 'sample_stripe_price_id',
            status: 'published',
        });
        testCourse2 = await Courses.create({
            title: 'Sample Course II',
            description: {
                miniDescription: 'Short description for the sample course',
            },
            instructor: testinstructor._id, // Replace with an existing instructor ID
            category: 'Sample Category',
            price: {
                basePrice: 100,
                tax: 10,
                finalAmount: 110,
            },
            sections: [
                {
                    exercises: [{
                        title: 'Sample Title',
                        file: '',
                    }],
                    sectionDesctiption: 'Sample Description',
                    sectionTitle: 'Section 123',
                    videos: [
                        {
                            title: 'title',
                            path: 'path'
                        }
                    ]
                }
            ],
            stripeProductID: 'sample_stripe_product_id',
            stripePriceID: 'sample_stripe_price_id',
            status: 'published',
        });
        const response = await request(app)
            .get(`/courses/${testCourse2._id}`)
    
        assert.strictEqual(response.status, 200); // Check for the correct status code (201 for "Created")
        assert.strictEqual(response._body.item.title, testCourse2.title); // Validate the created instructor's details
    });
    

    // it("checks no data condition", async () => {
    //     const response = await request(app)
    //         .get(`/admin/getPcInstructors`)
    //     assert.strictEqual(response.status, 200)
    //     assert.strictEqual(response._body, "No Data!")
    // });

})