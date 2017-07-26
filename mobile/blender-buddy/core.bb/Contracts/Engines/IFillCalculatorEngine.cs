using System.Threading.Tasks;
using core.bb.Models;

namespace core.bb.Contracts.Engines
{
    internal interface IFillCalculatorEngine
    {
        Task<CalculationResult> CalculateFill(CalculationRequest request);
    }
}
