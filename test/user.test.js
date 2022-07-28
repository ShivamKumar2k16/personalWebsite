const supertest = require("supertest");
const should = require("should");
const app = require("../server");


// describe("Test paths", () => {
//     it("should redirect to /", done => {
//         supertest(app)
//             .get("/")
//             .expect(200)
//             .end((err, res) => {
//                 if (err) return done(err);
//                 should.exist(res.body.data);
//                 done();
//             });
//     });
// });


describe("Test signup", () => {
    it("should test to /signup", done => {
        supertest(app)
            .post("/setup/signup")
            .send({
                email: "shivam@gmail.com",
                username: "shivam@gmail.com", password: "shivam@79@", roles: ["admin"]
            })
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                should.exist(res.body);
                done();
            });
    });
});


describe("Test signup", () => {
    it("should test to /signup", done => {
        supertest(app)
            .post("/setup/signup")
            .send({
                email: "shivam@gmail.com",
                username: "shivam@gmail.com", password: "shivam@79@", roles: ["admin"]
            })
            .expect(500)
            .end((err, res) => {
                if (err) return done(err);
                should.exist(res.body);
                done();
            });
    });
});