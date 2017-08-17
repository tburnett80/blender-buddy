///<reference path="../../node_modules/definitely-typed-jasmine/jasmine.d.ts"/>
describe("Sample test", function () {
    var varaiable = true;
    it("should match", function () {
        expect(varaiable).toBe(true);
    });
    it("should match also", function () {
        expect(varaiable).not.toBe(false);
    });
});
//# sourceMappingURL=SampleTests.js.map