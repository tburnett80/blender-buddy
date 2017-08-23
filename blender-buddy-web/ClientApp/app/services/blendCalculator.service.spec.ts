/// <reference path="../../../node_modules/@types/jasmine/index.d.ts" />

//import { assert } from 'chai';
import { BlendCalculatorService } from './blendCalculator.service';
import { CalculationRequest } from '../models/calculator/calculationRequest';
//import { CalculationResult } from '../models/calculator/calculationResult';
import { MeasureMode } from '../models/calculator/measureMode';
import { TopOffGas } from '../models/calculator/topOffGas';
//import { TestBed, async, ComponentFixture } from '@angular/core/testing';

describe('Blend Calculator', () => {
    const calc = new BlendCalculatorService();

    it('should return a valid EANx32 Blend starting with an empty tank, imperial', () => {
        //Arrange
        const request = new CalculationRequest();
        request.system = MeasureMode.Imperial;
        request.fillSpecs.pressure = 3000;
        request.fillSpecs.gasBlend.oxygen = 32;

        //Act
        const result = calc.calculateFill(request);

        //Assert
        expect(result.system).toEqual(MeasureMode.Imperial);
        expect(result.topOffGasType).toEqual(TopOffGas.Air);
        expect(result.topOffGasPressure).toEqual(2582.3);
        expect(result.fillSpecs.gasBlend.oxygen).toBe(417.7);
        expect(result.fillSpecs.gasBlend.helium).toEqual(0);
        expect(result.maxDepth).toEqual(111.4);
        expect(result.pO214Depth).toEqual(111.4);
        expect(result.pO216Depth).toEqual(132);
        expect(result.hypoxicDepth).toEqual(-14.4);
        expect(result.warnings.length).toEqual(0);
    });

    it('should return a valid EANx32 Blend starting with an empty tank, metric', () => {
        //Arrange
        const request = new CalculationRequest();
        request.system = MeasureMode.Metric;
        request.fillSpecs.pressure = 193;
        request.fillSpecs.gasBlend.oxygen = 30;

        //Act
        const result = calc.calculateFill(request);

        //Assert
        expect(result.system).toEqual(MeasureMode.Metric);
        expect(result.topOffGasType).toEqual(TopOffGas.Air);
        expect(result.topOffGasPressure).toEqual(171);
        expect(result.fillSpecs.gasBlend.oxygen).toBe(22);
        expect(result.fillSpecs.gasBlend.helium).toEqual(0);
        expect(result.maxDepth).toEqual(36.9);
        expect(result.pO214Depth).toEqual(36.9);
        expect(result.pO216Depth).toEqual(43.6);
        expect(result.hypoxicDepth).toEqual(-4);
        expect(result.warnings.length).toEqual(0);
    });
});