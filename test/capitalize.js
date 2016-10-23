var capitalize = require("../lib/capitalize")
var chai = require("chai");
var expect = chai.expect;


describe("capitalize", function () {
    it("Capitalizes words", function () {
        expect(capitalize("express")).to.equal("Express");
        expect(capitalize("hello")).to.equal("Hello");
        expect(capitalize("h")).to.equal("H");
        expect(capitalize("HH")).to.equal("Hh");
        expect(capitalize("hH")).to.equal("Hh");
    });

    it("Capitalizes a sentence", function () {
        expect(capitalize("this is test sentence")).to.equal("This is test sentence");
        expect(capitalize("hello world")).to.equal("Hello world")
    });

    it("Leaves the empty string as is", function () {
        expect(capitalize("")).to.equal("");
        expect(capitalize()).to.equal("");
    })
});