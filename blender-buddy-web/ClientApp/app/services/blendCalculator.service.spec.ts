/// <reference path="../../../node_modules/@types/jasmine/index.d.ts" />

import { assert } from 'chai';
import { BlendCalculatorService } from './blendCalculator.service';
import { CalculationRequest } from '../models/calculator/calculationRequest';
import { CalculationResult } from '../models/calculator/calculationResult';
import { MeasureMode } from '../models/calculator/measureMode';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';

describe('Blend Calculator', () => {
    let calc = new BlendCalculatorService();

    it("should return an object", () => {
        const request = new CalculationRequest();

        request.system = MeasureMode.Imperial;
        request.fillSpecs.pressure = 3000;
        request.fillSpecs.gasBlend.oxygen = 32;

        const result = calc.calculateFill(request);
        expect(result.fillSpecs.gasBlend.oxygen).toBe(417.7);
    });

});