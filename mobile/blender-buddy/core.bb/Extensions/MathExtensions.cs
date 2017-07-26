
using System;

namespace core.bb.Extensions
{
    internal static class MathExtensions
    {
        public static decimal CalculateVariablePercentOf(this decimal percentDesired, decimal number)
        {
            return (number / 100) * percentDesired;
        }

        public static decimal Round(this decimal value)
        {
            return Math.Round(value, 1);
        }
    }
}
