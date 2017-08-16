define(["require", "exports", "../Models/CalculationResult"], function (require, exports, CalculationResult_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BlendCalculator = (function () {
        function BlendCalculator() {
        }
        BlendCalculator.prototype.CalculateFill = function (request) {
            var result = new CalculationResult_1.CalculationResult();
            if (request.fillSpecs.gasBlend.oxygen > 40)
                result.warnings.push('Oxygen compatability required for this blend');
            if (request.fillSpecs.gasBlend.oxygen.toPercent() < 0.18)
                result.warnings.push('Travel Gas required for this blend');
            var tankPressure = request.fillSpecs.pressure - request.residual.pressure;
            var oxygenFillPercent = BlendCalculator.CalculateFillPercent(request.fillSpecs.gasBlend.oxygen.toPercent(), request.fillSpecs.pressure, request.residual.gasBlend.oxygen.toPercent(), request.residual.pressure);
            var heliumFillPercent = BlendCalculator.CalculateFillPercent(request.fillSpecs.gasBlend.helium.toPercent(), request.fillSpecs.pressure, request.residual.gasBlend.helium.toPercent(), request.residual.pressure);
            var heliumFillPressure = heliumFillPercent * tankPressure;
            var oxygenFillPressure = BlendCalculator.CalculateOxygenFillPressure(oxygenFillPercent, BlendCalculator.DeterminTopOffOxygen(request.topOffGasType, request.topOffGas), heliumFillPercent, BlendCalculator.DeterminTopOffNitrogen(request.topOffGasType, request.topOffGas), tankPressure - heliumFillPressure);
            var mod = BlendCalculator.CalculateMaxDepth(request.fillSpecs.gasBlend.oxygen.toPercent(), 1.4, request.system).round();
            result.system = request.system;
            result.maxDepth = mod;
            result.pO214Depth = mod;
            result.pO216Depth = BlendCalculator.CalculateMaxDepth(request.fillSpecs.gasBlend.oxygen.toPercent(), 1.6, request.system).round();
            result.hypoxicDepth = BlendCalculator.CalculateHypoxicDepth(request.fillSpecs.gasBlend.oxygen.toPercent(), request.system).round();
            result.topOffGas = tankPressure - oxygenFillPressure.round() - heliumFillPressure.round();
            result.topOffGasType = request.topOffGasType;
            result.fillSpecs.gasBlend.oxygen = oxygenFillPressure.round();
            result.fillSpecs.gasBlend.helium = heliumFillPressure.round();
            if (result.fillSpecs.gasBlend.helium < 0 || result.fillSpecs.gasBlend.oxygen < 0)
                result.warnings.push('Cannot achieve this blend, please empty the tank and start over empty.');
            return result;
        };
        BlendCalculator.CalculateFillPercent = function (desiredGasPercent, desiredFillPressure, residualGasPercent, residualPressure) {
            if (residualGasPercent === void 0) { residualGasPercent = 0; }
            if (residualPressure === void 0) { residualPressure = 0; }
            var desiredPercentOfTank = desiredGasPercent * desiredFillPressure;
            var residualMixOfTank = residualGasPercent * residualPressure;
            var actualPressure = desiredFillPressure - residualPressure;
            return (desiredPercentOfTank - residualMixOfTank) / actualPressure;
        };
        BlendCalculator.CalculateOxygenFillPressure = function (oxygenPercent, topOffOxygenPercent, heliumPercent, nitrogenPercent, tankPressure) {
            return (oxygenPercent / (1 - heliumPercent) - topOffOxygenPercent) / nitrogenPercent * tankPressure;
        };
        BlendCalculator.CalculateMaxDepth = function (o2Percent, o2PartialPreasureLimit, system) {
            var mod = (o2PartialPreasureLimit / o2Percent - 1) * 33;
            if (system === MeasureMode.Metric)
                mod /= 3.28;
            return mod;
        };
        BlendCalculator.CalculateHypoxicDepth = function (o2Percent, system, o2PartialPreasureCeiling) {
            if (o2PartialPreasureCeiling === void 0) { o2PartialPreasureCeiling = BlendCalculator.minPpO2; }
            var ceiling = (o2PartialPreasureCeiling / o2Percent - 1) * 33;
            if (system === MeasureMode.Metric)
                ceiling /= 3.28;
            return ceiling;
        };
        BlendCalculator.DeterminTopOffOxygen = function (gasType, gas) {
            switch (gasType) {
                case TopOffGas.Air:
                    return BlendCalculator.airO2Percent;
                case TopOffGas.Ean32:
                    return BlendCalculator.ean32_O2Percent;
                case TopOffGas.Ean36:
                    return BlendCalculator.ean36_O2Percent;
                case TopOffGas.Custom:
                    if (!gas)
                        throw new RangeError("Could not determin Top off Oxygen. Empty tank and start over.");
                    return gas.oxygen.toPercent();
                default:
                    throw new RangeError("Could not determin Top off Oxygen. Empty tank and start over.");
            }
        };
        BlendCalculator.DeterminTopOffNitrogen = function (gasType, gas) {
            switch (gasType) {
                case TopOffGas.Air:
                    return 1 - BlendCalculator.airO2Percent;
                case TopOffGas.Ean32:
                    return 1 - BlendCalculator.ean32_O2Percent;
                case TopOffGas.Ean36:
                    return 1 - BlendCalculator.ean36_O2Percent;
                case TopOffGas.Custom:
                    if (!gas)
                        throw new RangeError("Could not determin Top off Nitrogen. Empty tank and start over.");
                    return (100 - gas.oxygen + gas.helium).toPercent();
                default:
                    throw new RangeError("Could not determin Top off Nitrogen. Empty tank and start over.");
            }
        };
        return BlendCalculator;
    }());
    BlendCalculator.airO2Percent = 0.21;
    BlendCalculator.ean32_O2Percent = 0.32;
    BlendCalculator.ean36_O2Percent = 0.36;
    BlendCalculator.minPpO2 = 0.18;
    exports.BlendCalculator = BlendCalculator;
});
//# sourceMappingURL=BlendCalculator.js.map