define(["require", "exports", "./TankInfo"], function (require, exports, TankInfo_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CalculationResult = (function () {
        function CalculationResult() {
            this.system = MeasureMode.Imperial;
            this.topOffGasType = TopOffGas.Air;
            this.fillSpecs = new TankInfo_1.TankInfo();
        }
        return CalculationResult;
    }());
    exports.CalculationResult = CalculationResult;
});
//# sourceMappingURL=CalculationResult.js.map