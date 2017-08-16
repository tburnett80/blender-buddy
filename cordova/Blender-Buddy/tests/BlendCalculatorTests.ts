/// <reference path="qunit.d.ts" />
/// <reference path="../scripts/Calculator/BlendCalculator.ts" />

import { BlendCalculator } from '../scripts/Calculator/BlendCalculator';
import { CalculationRequest } from '../scripts/Models/CalculationRequest';
import { CalculationResult } from '../scripts/Models/CalculationResult';

QUnit.module("BlendCalculator");

test("Will calculate nitrox fill empty cylinder topped off with air", () => {
    //arrang
    let request = new CalculationRequest();
    request.fillSpecs.pressure = 3000;
    request.fillSpecs.gasBlend.oxygen = 32;

    //act
    let calculator = new BlendCalculator();
    let result = calculator.CalculateFill(request);

    //assert
    equal(result.system, MeasureMode.Imperial, "Should be imperial by default.");

});






//QUnit.module("");

//test("", () => {

//});