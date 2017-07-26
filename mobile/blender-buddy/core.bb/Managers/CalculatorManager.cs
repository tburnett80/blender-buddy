using System.Threading.Tasks;
using core.bb.Contracts;
using core.bb.Contracts.Engines;
using core.bb.Engines;
using core.bb.Models;

namespace core.bb.Managers
{
    public sealed class CalculatorManager : ICalculatorManager
    {
        private readonly IFillCalculatorEngine _calculatorEngine;

        public CalculatorManager()
            :this(new FillCalculatorEngine())
        {
        }

        internal CalculatorManager(IFillCalculatorEngine calculatorEngine)
        {
            _calculatorEngine = calculatorEngine;
        }

        public async Task<CalculationResult> CalculateFill(CalculationRequest fillParams)
        {
            return await _calculatorEngine.CalculateFill(fillParams);
        }
    }
}
