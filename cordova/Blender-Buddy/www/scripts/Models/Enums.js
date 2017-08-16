var TopOffGas;
(function (TopOffGas) {
    TopOffGas[TopOffGas["Air"] = 0] = "Air";
    TopOffGas[TopOffGas["Ean32"] = 1] = "Ean32";
    TopOffGas[TopOffGas["Ean36"] = 2] = "Ean36";
    //TODO: add trimix blends here
    TopOffGas[TopOffGas["Custom"] = 3] = "Custom";
})(TopOffGas || (TopOffGas = {}));
window.TopOffGas = TopOffGas;
var MeasureMode;
(function (MeasureMode) {
    MeasureMode[MeasureMode["Imperial"] = 0] = "Imperial";
    MeasureMode[MeasureMode["Metric"] = 1] = "Metric";
})(MeasureMode || (MeasureMode = {}));
window.MeasureMode = MeasureMode;
//# sourceMappingURL=Enums.js.map