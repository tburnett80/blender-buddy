using System.Threading.Tasks;
using core.bb.Models;

namespace core.bb.Contracts
{
    public interface ICalculatorManager
    {
        Task<CalculationResult> CalculateFill(CalculationRequest fillParams);
    }
}
