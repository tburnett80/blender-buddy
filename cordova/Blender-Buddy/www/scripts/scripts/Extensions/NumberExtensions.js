Number.prototype.toPercent = function () {
    return this / 100;
};
Number.prototype.round = function (precision) {
    if (precision === void 0) { precision = 1; }
    var factor = Math.pow(10, precision);
    return Math.round(this * factor) / factor;
};
//# sourceMappingURL=NumberExtensions.js.map