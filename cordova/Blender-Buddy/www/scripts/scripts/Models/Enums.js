define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    //TODO: add trimix blends here
    var TopOffGas;
    (function (TopOffGas) {
        TopOffGas[TopOffGas["Air"] = 0] = "Air";
        TopOffGas[TopOffGas["Ean32"] = 1] = "Ean32";
        TopOffGas[TopOffGas["Ean36"] = 2] = "Ean36";
        TopOffGas[TopOffGas["Custom"] = 3] = "Custom";
    })(TopOffGas = exports.TopOffGas || (exports.TopOffGas = {}));
    var MeasureMode;
    (function (MeasureMode) {
        MeasureMode[MeasureMode["Imperial"] = 0] = "Imperial";
        MeasureMode[MeasureMode["Metric"] = 1] = "Metric";
    })(MeasureMode = exports.MeasureMode || (exports.MeasureMode = {}));
});
//# sourceMappingURL=Enums.js.map