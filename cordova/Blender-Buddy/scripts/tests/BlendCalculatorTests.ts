///<reference path="../../node_modules/definitely-typed-jasmine/jasmine.d.ts"/>
///<reference path="../Calculator/BlendCalculator.ts"/>
///<reference path="../Models/CalculationRequest.ts"/>
///<reference path="../Models/CalculationResult.ts"/>
///<reference path="../Models/MeasureMode.ts"/>
///<reference path="../Models/TankInfo.ts"/>
///<reference path="../Models/Gas.ts"/>

import { BlendCalculator } from "../Calculator/BlendCalculator";
import { CalculationRequest } from "../Models/CalculationRequest";
import { CalculationResult } from "../Models/CalculationResult";
import { MeasureMode } from "../Models/MeasureMode";
import { TankInfo } from "../Models/TankInfo";
import { Gas } from "../Models/Gas";

describe("Blend test", () => {
    let calc = new BlendCalculator();
    
    it("should give a valid EANx32 Blend", () => {
        let request = new CalculationRequest();

        request.system = MeasureMode.Imperial;
        request.fillSpecs.pressure = 3000;
        request.fillSpecs.gasBlend.oxygen = 32;

        let result = calc.CalculateFill(request);

        expect(result.fillSpecs.gasBlend.oxygen).toBe(417.7);
    });
});