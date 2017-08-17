define(["require", "exports", "./TankInfo", "./MeasureMode", "./TopOffGas"], function (require, exports, TankInfo_1, MeasureMode_1, TopOffGas_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CalculationResult = (function () {
        function CalculationResult() {
            this.system = MeasureMode_1.MeasureMode.Imperial;
            this.topOffGasType = TopOffGas_1.TopOffGas.Air;
            this.fillSpecs = new TankInfo_1.TankInfo();
        }
        return CalculationResult;
    }());
    exports.CalculationResult = CalculationResult;
});
//# sourceMappingURL=CalculationResult.js.map