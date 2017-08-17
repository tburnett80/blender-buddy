///<reference path="../../node_modules/definitely-typed-jasmine/jasmine.d.ts"/>

//https://www.codeproject.com/Tips/1030700/Testing-Typescript-with-Jasmine-and-Chutzpah
describe("Sample test", () => {
    let varaiable = true;

    it("should match", () => {
        expect(varaiable).toBe(true);
    });

    it("should not match", () => {
        expect(varaiable).toBe(false);
    });
});