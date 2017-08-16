
interface Number {
    toPercent: () => number;
    round(precision?: number): number;
}

Number.prototype.toPercent = function(): number {
    return this / 100;
}

Number.prototype.round = function (precision = 1): number {
    let factor = Math.pow(10, precision);
    return Math.round(this * factor) / factor;
}