var app = require("../app");
var supertest = require("supertest");
var cheerio = require("cheerio")


describe("plain text response", function() {
    it("returns a plain text response", function(done) {
        supertest(app)
        .get("/supertest")
        .set("User-Agent", "my test agent")
        .set('Accept', "text/plain")
        .expect("Content-Type", /text\/plain/)
        .expect(200)
        .end(done)
    });
    it("returns your User Agent", function(done) {
        supertest(app)
        .get("/supertest")
        .set("User-Agent", "my test agent")
        .set("Accept", "text/plain")
        .expect(function(res) {
            if (res.text !== "my test agent") {
                throw new Error("Response does not contain user agent")
            }
        })
        .end(done);
    });
});

describe("html response", function() {
    var request;
    beforeEach(function() {
        request =   supertest(app)
                    .get("/supertest")
                    .set("User-Agent", "a cool browser")
                    .set("Accept", "text/html");
    });
    it("returns an HTML response", function(done) {
        request.expect("Content-Type", /html/)
            .expect(200)
            .end(done);
    });
    it("returns your User Agent", function(done) {
        request.expect(function (res) {
            var html = res.text;
            var $ = cheerio.load(html);
            var userAgent = $(".user-agent").html().trim();
            if (userAgent !== "a cool browser") {
                throw new Error("Not a correct user agent");
            }
        }).end(done);
    });
});