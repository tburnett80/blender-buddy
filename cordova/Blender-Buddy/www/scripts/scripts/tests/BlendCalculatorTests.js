///<reference path="../../node_modules/definitely-typed-jasmine/jasmine.d.ts"/>
///<reference path="../../www/lib/require.2.1.8.js" />
define(["require", "exports", "../Calculator/BlendCalculator", "../Models/CalculationRequest", "../Models/MeasureMode"], function (require, exports, BlendCalculator_1, CalculationRequest_1, MeasureMode_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe("Blend test", function () {
        var calc = new BlendCalculator_1.BlendCalculator();
        it("should give a valid EANx32 Blend", function () {
            var request = new CalculationRequest_1.CalculationRequest();
            request.system = MeasureMode_1.MeasureMode.Imperial;
            request.fillSpecs.pressure = 3000;
            request.fillSpecs.gasBlend.oxygen = 32;
            var result = calc.CalculateFill(request);
            expect(result.fillSpecs.gasBlend.oxygen).toBe(417.7);
        });
    });
});
//# sourceMappingURL=BlendCalculatorTests.js.map