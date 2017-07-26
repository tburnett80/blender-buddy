
using core.bb.Models;

namespace core.bb.Contracts
{
    public interface ICalculatorManager
    {
        CalculationResult CalculateFill(CalculationRequest fillParams);
    }
}
