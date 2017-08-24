/// <reference path="../../../node_modules/@types/jasmine/index.d.ts" />

import { BlendCalculatorService } from './blendCalculator.service';
import { CalculationRequest } from '../models/calculator/calculationRequest';
import { MeasureMode } from '../models/calculator/measureMode';
import { TopOffGas } from '../models/calculator/topOffGas';
import { TestBed, inject } from '@angular/core/testing';

describe('Blend Calculator', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [BlendCalculatorService]
        });
    });

    it('should be injectable by angular', () => {
        inject([BlendCalculatorService], (service: BlendCalculatorService) => {
            expect(service).toBeDefined();
        });
    });

    it('should return a valid EANx Blend starting with an empty tank, imperial', () => {
        inject([BlendCalculatorService], (service: BlendCalculatorService) => {
            //Arrange
            const request = new CalculationRequest();
            request.fillSpecs.pressure = 3000;
            request.fillSpecs.gasBlend.oxygen = 32;

            //Act
            const result = service.calculateFill(request);

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
    });

    it('should return a valid EANx Blend starting with an empty tank, metric', () => {
        inject([BlendCalculatorService], (service: BlendCalculatorService) => {
            //Arrange
            const request = new CalculationRequest();
            request.system = MeasureMode.Metric;
            request.fillSpecs.pressure = 193;
            request.fillSpecs.gasBlend.oxygen = 30;

            //Act
            const result = service.calculateFill(request);

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

    it('should return a valid EANx Blend starting with residual, imperial', () => {
        inject([BlendCalculatorService], (service: BlendCalculatorService) => {
            //Arrange
            const request = new CalculationRequest();
            request.fillSpecs.pressure = 3000;
            request.fillSpecs.gasBlend.oxygen = 36;
            request.residual.pressure = 1000;
            request.residual.gasBlend.oxygen = 30;

            //Act
            const result = service.calculateFill(request);

            //Assert
            expect(result.system).toEqual(MeasureMode.Imperial);
            expect(result.topOffGasType).toEqual(TopOffGas.Air);
            expect(result.topOffGasPressure).toEqual(1544.3);
            expect(result.fillSpecs.gasBlend.oxygen).toBe(455.7);
            expect(result.fillSpecs.gasBlend.helium).toEqual(0);
            expect(result.maxDepth).toEqual(95.3);
            expect(result.pO214Depth).toEqual(95.3);
            expect(result.pO216Depth).toEqual(113.7);
            expect(result.hypoxicDepth).toEqual(-16.5);
            expect(result.warnings.length).toEqual(0);
        });
    });

    it('should return a valid EANx Blend starting with residual, metric', () => {
        inject([BlendCalculatorService], (service: BlendCalculatorService) => {
            //Arrange
            const request = new CalculationRequest();
            request.system = MeasureMode.Metric;
            request.fillSpecs.pressure = 165.4;
            request.fillSpecs.gasBlend.oxygen = 34;
            request.residual.pressure = 36.2;
            request.residual.gasBlend.oxygen = 38;

            //Act
            const result = service.calculateFill(request);

            //Assert
            expect(result.system).toEqual(MeasureMode.Metric);
            expect(result.topOffGasType).toEqual(TopOffGas.Air);
            expect(result.topOffGasPressure).toEqual(109.8);
            expect(result.fillSpecs.gasBlend.oxygen).toBe(19.4);
            expect(result.fillSpecs.gasBlend.helium).toEqual(0);
            expect(result.maxDepth).toEqual(31.4);
            expect(result.pO214Depth).toEqual(31.4);
            expect(result.pO216Depth).toEqual(37.3);
            expect(result.hypoxicDepth).toEqual(-4.7);
            expect(result.warnings.length).toEqual(0);
        });
    });

    it('should return a valid EANx Blend starting with an empty tank, custom top off, imperial', () => {
        inject([BlendCalculatorService], (service: BlendCalculatorService) => {
            //Arrange
            const request = new CalculationRequest();
            request.fillSpecs.pressure = 2800;
            request.fillSpecs.gasBlend.oxygen = 36;
            request.topOffGasType = TopOffGas.Custom;
            request.topOffGasDetails.oxygen = 21;

            //Act
            const result = service.calculateFill(request);

            //Assert
            expect(result.system).toEqual(MeasureMode.Imperial);
            expect(result.topOffGasType).toEqual(TopOffGas.Custom);
            expect(result.topOffGasPressure).toEqual(2268.4);
            expect(result.fillSpecs.gasBlend.oxygen).toBe(531.6);
            expect(result.fillSpecs.gasBlend.helium).toEqual(0);
            expect(result.maxDepth).toEqual(95.3);
            expect(result.pO214Depth).toEqual(95.3);
            expect(result.pO216Depth).toEqual(113.7);
            expect(result.hypoxicDepth).toEqual(-16.5);
            expect(result.warnings.length).toEqual(0);
        });
    });

    it('should return a valid EANx Blend starting with an empty tank, custom top off, metric', () => {
        inject([BlendCalculatorService], (service: BlendCalculatorService) => {
            //Arrange
            const request = new CalculationRequest();
            request.system = MeasureMode.Metric;
            request.fillSpecs.pressure = 193;
            request.fillSpecs.gasBlend.oxygen = 36;
            request.topOffGasType = TopOffGas.Custom;
            request.topOffGasDetails.oxygen = 21;

            //Act
            const result = service.calculateFill(request);

            //Assert
            expect(result.system).toEqual(MeasureMode.Metric);
            expect(result.topOffGasType).toEqual(TopOffGas.Custom);
            expect(result.topOffGasPressure).toEqual(156.4);
            expect(result.fillSpecs.gasBlend.oxygen).toBe(36.6);
            expect(result.fillSpecs.gasBlend.helium).toEqual(0);
            expect(result.maxDepth).toEqual(29.1);
            expect(result.pO214Depth).toEqual(29.1);
            expect(result.pO216Depth).toEqual(34.7);
            expect(result.hypoxicDepth).toEqual(-5);
            expect(result.warnings.length).toEqual(0);
        });
    });

    it('should return a valid EANx Blend starting with an empty tank, EANx32 top off, imperial', () => {
        inject([BlendCalculatorService], (service: BlendCalculatorService) => {
            //Arrange
            const request = new CalculationRequest();
            request.fillSpecs.pressure = 2400;
            request.fillSpecs.gasBlend.oxygen = 36;
            request.topOffGasType = TopOffGas.Ean32;

            //Act
            const result = service.calculateFill(request);

            //Assert
            expect(result.system).toEqual(MeasureMode.Imperial);
            expect(result.topOffGasType).toEqual(TopOffGas.Ean32);
            expect(result.topOffGasPressure).toEqual(2258.8);
            expect(result.fillSpecs.gasBlend.oxygen).toBe(141.2);
            expect(result.fillSpecs.gasBlend.helium).toEqual(0);
            expect(result.maxDepth).toEqual(95.3);
            expect(result.pO214Depth).toEqual(95.3);
            expect(result.pO216Depth).toEqual(113.7);
            expect(result.hypoxicDepth).toEqual(-16.5);
            expect(result.warnings.length).toEqual(0);
        });
    });

    it('should return a valid EANx Blend starting with an empty tank, EANx36 top off, imperial', () => {
        inject([BlendCalculatorService], (service: BlendCalculatorService) => {
            //Arrange
            const request = new CalculationRequest();
            request.fillSpecs.pressure = 3000;
            request.fillSpecs.gasBlend.oxygen = 40;
            request.topOffGasType = TopOffGas.Ean36;

            //Act
            const result = service.calculateFill(request);

            //Assert
            expect(result.system).toEqual(MeasureMode.Imperial);
            expect(result.topOffGasType).toEqual(TopOffGas.Ean36);
            expect(result.topOffGasPressure).toEqual(2812.5);
            expect(result.fillSpecs.gasBlend.oxygen).toBe(187.5);
            expect(result.fillSpecs.gasBlend.helium).toEqual(0);
            expect(result.maxDepth).toEqual(82.5);
            expect(result.pO214Depth).toEqual(82.5);
            expect(result.pO216Depth).toEqual(99);
            expect(result.hypoxicDepth).toEqual(-18.2);
            expect(result.warnings.length).toEqual(0);
        });
    });

    it('should return a valid Heliar / Trimix Blend starting with an empty tank, imperial', () => {
        inject([BlendCalculatorService], (service: BlendCalculatorService) => {
            //Arrange
            const request = new CalculationRequest();
            request.fillSpecs.pressure = 3000;
            request.fillSpecs.gasBlend.oxygen = 32;
            request.fillSpecs.gasBlend.helium = 40;

            //Act
            const result = service.calculateFill(request);

            //Assert
            expect(result.system).toEqual(MeasureMode.Imperial);
            expect(result.topOffGasType).toEqual(TopOffGas.Air);
            expect(result.topOffGasPressure).toEqual(1063.3);
            expect(result.fillSpecs.gasBlend.oxygen).toBe(736.7);
            expect(result.fillSpecs.gasBlend.helium).toEqual(1200);
            expect(result.maxDepth).toEqual(111.4);
            expect(result.pO214Depth).toEqual(111.4);
            expect(result.pO216Depth).toEqual(132);
            expect(result.hypoxicDepth).toEqual(-14.4);
            expect(result.warnings.length).toEqual(0);
        });
    });

    it('should return a valid Heliar / Trimix Blend starting with an empty tank, metric', () => {
        inject([BlendCalculatorService], (service: BlendCalculatorService) => {
            //Arrange
            const request = new CalculationRequest();
            request.system = MeasureMode.Metric;
            request.fillSpecs.pressure = 200;
            request.fillSpecs.gasBlend.oxygen = 19;
            request.fillSpecs.gasBlend.helium = 40;

            //Act
            const result = service.calculateFill(request);

            //Assert
            expect(result.system).toEqual(MeasureMode.Metric);
            expect(result.topOffGasType).toEqual(TopOffGas.Air);
            expect(result.topOffGasPressure).toEqual(103.8);
            expect(result.fillSpecs.gasBlend.oxygen).toBe(16.2);
            expect(result.fillSpecs.gasBlend.helium).toEqual(80);
            expect(result.maxDepth).toEqual(64.1);
            expect(result.pO214Depth).toEqual(64.1);
            expect(result.pO216Depth).toEqual(74.7);
            expect(result.hypoxicDepth).toEqual(-0.5);
            expect(result.warnings.length).toEqual(0);
        });
    });

    it('should return a valid Heliar / Trimix Blend starting with residual, imperial', () => {
        inject([BlendCalculatorService], (service: BlendCalculatorService) => {
            //Arrange
            const request = new CalculationRequest();
            request.fillSpecs.pressure = 3000;
            request.fillSpecs.gasBlend.oxygen = 30;
            request.fillSpecs.gasBlend.helium = 40;
            request.residual.pressure = 1000;
            request.residual.gasBlend.helium = 10;
            request.residual.gasBlend.oxygen = 25;

            //Act
            const result = service.calculateFill(request);

            //Assert
            expect(result.system).toEqual(MeasureMode.Imperial);
            expect(result.topOffGasType).toEqual(TopOffGas.Air);
            expect(result.topOffGasPressure).toEqual(316.5);
            expect(result.fillSpecs.gasBlend.oxygen).toBe(583.5);
            expect(result.fillSpecs.gasBlend.helium).toEqual(1100);
            expect(result.maxDepth).toEqual(121);
            expect(result.pO214Depth).toEqual(121);
            expect(result.pO216Depth).toEqual(143);
            expect(result.hypoxicDepth).toEqual(-13.2);
            expect(result.warnings.length).toEqual(0);
        });
    });

    it('should return a valid Heliar / Trimix Blend starting with residual, metric', () => {
        inject([BlendCalculatorService], (service: BlendCalculatorService) => {
            //Arrange
            const request = new CalculationRequest();
            request.system = MeasureMode.Metric;
            request.fillSpecs.pressure = 200;
            request.fillSpecs.gasBlend.oxygen = 28;
            request.fillSpecs.gasBlend.helium = 35;
            request.residual.pressure = 50;
            request.residual.gasBlend.helium = 15;
            request.residual.gasBlend.oxygen = 23;

            //Act
            const result = service.calculateFill(request);

            //Assert
            expect(result.system).toEqual(MeasureMode.Metric);
            expect(result.topOffGasType).toEqual(TopOffGas.Air);
            expect(result.topOffGasPressure).toEqual(54.4);
            expect(result.fillSpecs.gasBlend.oxygen).toBe(33.1);
            expect(result.fillSpecs.gasBlend.helium).toEqual(62.5);
            expect(result.maxDepth).toEqual(40.2);
            expect(result.pO214Depth).toEqual(40.2);
            expect(result.pO216Depth).toEqual(47.4);
            expect(result.hypoxicDepth).toEqual(-3.6);
            expect(result.warnings.length).toEqual(0);
        });
    });

    it('should return a warning filling high O2 mixes', () => {
        inject([BlendCalculatorService], (service: BlendCalculatorService) => {
            //Arrange
            const request = new CalculationRequest();
            request.fillSpecs.pressure = 3000;
            request.fillSpecs.gasBlend.oxygen = 45;

            //Act
            const result = service.calculateFill(request);

            //Assert
            expect(result.warnings.length).toEqual(1);
            expect(result.warnings[0]).toEqual('Oxygen compatability required for this blend');
        });
    });

    it('should return a warning filling possible hypoxic mixes', () => {
        inject([BlendCalculatorService], (service: BlendCalculatorService) => {
            //Arrange
            const request = new CalculationRequest();
            request.fillSpecs.pressure = 3000;
            request.fillSpecs.gasBlend.oxygen = 15;
            request.fillSpecs.gasBlend.helium = 45;

            //Act
            const result = service.calculateFill(request);

            //Assert
            expect(result.warnings.length).toEqual(1);
            expect(result.warnings[0]).toEqual('Travel Gas required for this blend');
        });
    });

    it('should return a warning filling possibly unmixable', () => {
        inject([BlendCalculatorService], (service: BlendCalculatorService) => {
            //Arrange
            const request = new CalculationRequest();
            request.fillSpecs.pressure = 3000;
            request.fillSpecs.gasBlend.oxygen = 28;
            request.residual.pressure = 1600;
            request.residual.gasBlend.oxygen = 40;

            //Act
            const result = service.calculateFill(request);

            //Assert
            expect(result.warnings.length).toEqual(1);
            expect(result.warnings[0]).toEqual('Cannot achieve this blend, please empty the tank and start over empty.');
        });
    });
});