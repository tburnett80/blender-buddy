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

        public CalculationResult CalculateFill(CalculationRequest fillParams)
        {
            throw new System.NotImplementedException();
        }
    }
}
