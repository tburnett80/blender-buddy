
namespace core.bb.Extensions
{
    internal static class MathExtensions
    {
        public static decimal CalculateVariablePercentOf(this decimal percentDesired, decimal number)
        {
            return (number / 100) * percentDesired;
        }
    }
}
