///<reference path="../../node_modules/definitely-typed-jasmine/jasmine.d.ts"/>

describe("Sample test", () => {
    let varaiable = true;

    it("should match", () => {
        expect(varaiable).toBe(true);
    });

    it("should match also", () => {
        expect(varaiable).not.toBe(false);
    });
});