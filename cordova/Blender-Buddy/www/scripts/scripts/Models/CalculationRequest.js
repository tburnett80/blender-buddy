define(["require", "exports", "./Gas", "./TankInfo"], function (require, exports, Gas_1, TankInfo_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CalculationRequest = (function () {
        function CalculationRequest() {
            this.system = MeasureMode.Imperial;
            this.topOffGasType = TopOffGas.Air;
            this.topOffGas = new Gas_1.Gas();
            this.residual = new TankInfo_1.TankInfo();
            this.fillSpecs = new TankInfo_1.TankInfo();
        }
        return CalculationRequest;
    }());
    exports.CalculationRequest = CalculationRequest;
});
//# sourceMappingURL=CalculationRequest.js.map