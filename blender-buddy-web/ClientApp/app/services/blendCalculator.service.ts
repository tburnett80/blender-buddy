import { Injectable } from '@angular/core';

import { MeasureMode } from '../models/calculator/measureMode';
import { TopOffGas } from '../models/calculator/TopOffGas';
import { Gas } from '../models/calculator/gas';
import { CalculationRequest } from '../models/calculator/calculationRequest';
import { CalculationResult } from '../models/calculator/calculationResult';
import '../extensions/numberExtensions'

@Injectable()
export class BlendCalculatorService {
    static readonly airO2Percent = 0.21;
    static readonly ean32_O2Percent = 0.32;
    static readonly ean36_O2Percent = 0.36;
    static readonly minPpO2 = 0.18;

    public calculateFill(request: CalculationRequest): CalculationResult {
        let result = new CalculationResult();

        if (request.fillSpecs.gasBlend.oxygen > 40)
            result.warnings.push('Oxygen compatability required for this blend');
        if (request.fillSpecs.gasBlend.oxygen.toPercent() < 0.18)
            result.warnings.push('Travel Gas required for this blend');

        let tankPressure = request.fillSpecs.pressure - request.residual.pressure;

        let oxygenFillPercent = BlendCalculatorService.calculateFillPercent(request.fillSpecs.gasBlend.oxygen.toPercent(),
            request.fillSpecs.pressure, request.residual.gasBlend.oxygen.toPercent(),
            request.residual.pressure);

        let heliumFillPercent = BlendCalculatorService.calculateFillPercent(request.fillSpecs.gasBlend.helium.toPercent(),
            request.fillSpecs.pressure, request.residual.gasBlend.helium.toPercent(),
            request.residual.pressure);

        let heliumFillPressure = heliumFillPercent * tankPressure;

        let oxygenFillPressure = BlendCalculatorService.calculateOxygenFillPressure(oxygenFillPercent,
            BlendCalculatorService.determinTopOffOxygen(request.topOffGasType, request.topOffGas), heliumFillPercent,
            BlendCalculatorService.determinTopOffNitrogen(request.topOffGasType, request.topOffGas),
            tankPressure - heliumFillPressure);

        let mod = BlendCalculatorService.calculateMaxDepth(request.fillSpecs.gasBlend.oxygen.toPercent(), 1.4, request.system).round();

        result.system = request.system;
        result.maxDepth = mod;
        result.pO214Depth = mod;
        result.pO216Depth = BlendCalculatorService.calculateMaxDepth(request.fillSpecs.gasBlend.oxygen.toPercent(), 1.6, request.system).round();
        result.hypoxicDepth = BlendCalculatorService.calculateHypoxicDepth(request.fillSpecs.gasBlend.oxygen.toPercent(), request.system).round();
        result.topOffGas = tankPressure - oxygenFillPressure.round() - heliumFillPressure.round();
        result.topOffGasType = request.topOffGasType;
        result.fillSpecs.gasBlend.oxygen = oxygenFillPressure.round();
        result.fillSpecs.gasBlend.helium = heliumFillPressure.round();

        if (result.fillSpecs.gasBlend.helium < 0 || result.fillSpecs.gasBlend.oxygen < 0)
            result.warnings.push('Cannot achieve this blend, please empty the tank and start over empty.');

        return result;
    }

    private static calculateFillPercent(desiredGasPercent: number, desiredFillPressure: number, residualGasPercent = 0, residualPressure = 0): number {
        let desiredPercentOfTank = desiredGasPercent * desiredFillPressure;
        let residualMixOfTank = residualGasPercent * residualPressure;
        let actualPressure = desiredFillPressure - residualPressure;

        return (desiredPercentOfTank - residualMixOfTank) / actualPressure;
    }

    private static calculateOxygenFillPressure(oxygenPercent: number, topOffOxygenPercent: number, heliumPercent: number, nitrogenPercent: number, tankPressure: number): number {
        return (oxygenPercent / (1 - heliumPercent) - topOffOxygenPercent) / nitrogenPercent * tankPressure;
    }

    private static calculateMaxDepth(o2Percent: number, o2PartialPreasureLimit: number, system: MeasureMode): number {
        let mod = (o2PartialPreasureLimit / o2Percent - 1) * 33;
        if (system === MeasureMode.Metric)
            mod /= 3.28;

        return mod;
    }

    private static calculateHypoxicDepth(o2Percent: number, system: MeasureMode, o2PartialPreasureCeiling = BlendCalculatorService.minPpO2): number {
        let ceiling = (o2PartialPreasureCeiling / o2Percent - 1) * 33;
        if (system === MeasureMode.Metric)
            ceiling /= 3.28;

        return ceiling;
    }

    private static determinTopOffOxygen(gasType: TopOffGas, gas?: Gas): number {
        switch (gasType) {
        case TopOffGas.Air:
                return BlendCalculatorService.airO2Percent;
        case TopOffGas.Ean32:
                return BlendCalculatorService.ean32_O2Percent;
        case TopOffGas.Ean36:
                return BlendCalculatorService.ean36_O2Percent;
        case TopOffGas.Custom:
            if (!gas)
                throw new RangeError("Could not determin Top off Oxygen. Empty tank and start over.")
            return gas.oxygen.toPercent();
        default:
            throw new RangeError("Could not determin Top off Oxygen. Empty tank and start over.");
        }
    }

    private static determinTopOffNitrogen(gasType: TopOffGas, gas?: Gas): number {
        switch (gasType) {
        case TopOffGas.Air:
                return 1 - BlendCalculatorService.airO2Percent;
        case TopOffGas.Ean32:
                return 1 - BlendCalculatorService.ean32_O2Percent;
        case TopOffGas.Ean36:
                return 1 - BlendCalculatorService.ean36_O2Percent;
        case TopOffGas.Custom:
            if (!gas)
                throw new RangeError("Could not determin Top off Nitrogen. Empty tank and start over.")
            return (100 - gas.oxygen + gas.helium).toPercent();
        default:
            throw new RangeError("Could not determin Top off Nitrogen. Empty tank and start over.");
        }
    }
}