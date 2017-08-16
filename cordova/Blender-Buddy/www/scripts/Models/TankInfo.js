define(["require", "exports", "./Gas"], function (require, exports, Gas_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TankInfo = (function () {
        function TankInfo() {
            this.gasBlend = new Gas_1.Gas();
            this.pressure = 0;
        }
        return TankInfo;
    }());
    exports.TankInfo = TankInfo;
});
//# sourceMappingURL=TankInfo.js.map