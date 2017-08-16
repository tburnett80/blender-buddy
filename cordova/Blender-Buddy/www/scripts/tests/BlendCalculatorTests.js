/// <reference path="qunit.d.ts" />
/// <reference path="../scripts/Calculator/BlendCalculator.ts" />
define(["require", "exports", "../scripts/Calculator/BlendCalculator", "../scripts/Models/CalculationRequest"], function (require, exports, BlendCalculator_1, CalculationRequest_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    QUnit.module("BlendCalculator");
    test("Will calculate nitrox fill empty cylinder topped off with air", function () {
        //arrang
        var request = new CalculationRequest_1.CalculationRequest();
        request.fillSpecs.pressure = 3000;
        request.fillSpecs.gasBlend.oxygen = 32;
        //act
        var calculator = new BlendCalculator_1.BlendCalculator();
        var result = calculator.CalculateFill(request);
        //assert
        equal(result.system, MeasureMode.Imperial, "Should be imperial by default.");
    });
});
//QUnit.module("");
//test("", () => {
//}); 
//# sourceMappingURL=BlendCalculatorTests.js.map