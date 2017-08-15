using System.Threading.Tasks;
using core.bb.Models;

namespace core.bb.Contracts
{
    /// <summary>
    /// public entry point of the library
    /// </summary>
    public interface ICalculatorManager
    {
        Task<CalculationResult> CalculateFill(CalculationRequest fillParams);
    }
}
