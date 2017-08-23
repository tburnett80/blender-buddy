
interface Number  {
    toPercent: () => number;
    round: (precision?: number) => number;
}

Number.prototype.toPercent = function(this: number): number {
    return this / 100;
}

Number.prototype.round = function (this: number, precision = 1): number {
    const factor = Math.pow(10, precision);
    return Math.round(this * factor) / factor;
}