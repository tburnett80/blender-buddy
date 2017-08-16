define(["require", "exports", "./Gas", "./TankInfo", "./MeasureMode", "./TopOffGas"], function (require, exports, Gas_1, TankInfo_1, MeasureMode_1, TopOffGas_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CalculationRequest = (function () {
        function CalculationRequest() {
            this.system = MeasureMode_1.MeasureMode.Imperial;
            this.topOffGasType = TopOffGas_1.TopOffGas.Air;
            this.topOffGas = new Gas_1.Gas();
            this.residual = new TankInfo_1.TankInfo();
            this.fillSpecs = new TankInfo_1.TankInfo();
        }
        return CalculationRequest;
    }());
    exports.CalculationRequest = CalculationRequest;
});
//# sourceMappingURL=CalculationRequest.js.map