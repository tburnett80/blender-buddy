using System.Collections.Generic;
using System.Threading.Tasks;
using core.bb.Contracts.Engines;
using core.bb.Extensions;
using core.bb.Models;

namespace core.bb.Engines
{
    internal sealed class FillCalculatorEngine : IFillCalculatorEngine
    {
        private const decimal AirO2Percent = 0.21m;
        private const decimal AirNitrogenPercent = 0.79m;

        public async Task<CalculationResult> CalculateFill(CalculationRequest request)
        {
            return await Task.Run(() =>
            {
                var warnings = new List<string>();
                if (request.FillSpecs.HeliumPercent == 0m)
                {
                    if (request.FillSpecs.OxegynPercent > 40m)
                        warnings.Add("Oxygen compatability required for this blend");

                    return NitroxNoResidual(request);
                }

                return new CalculationResult();
            });
        }

        private CalculationResult NitroxNoResidual(CalculationRequest desiredFillSpecs)
        {
            var warnings = new List<string>();
            if (desiredFillSpecs.FillSpecs.OxegynPercent > 40m)
                warnings.Add("Oxygen compatability required for this blend");

            var oxygenFill = (desiredFillSpecs.FillSpecs.OxegynPercent / 100 - AirO2Percent) / AirNitrogenPercent * desiredFillSpecs.FillSpecs.Presure;
            var mod = CalculateMaxDepth(desiredFillSpecs.FillSpecs.OxegynPercent, 1.4m, desiredFillSpecs.System);

            return new CalculationResult
            {
                System = desiredFillSpecs.System,
                MaxDepth = mod,
                Po214Depth = mod,
                Po216Depth = CalculateMaxDepth(desiredFillSpecs.FillSpecs.OxegynPercent, 1.6m, desiredFillSpecs.System),
                Warnings = warnings,
                FillSpecs = new TankInfo
                {
                    OxegynPercent = oxygenFill,
                    NitrogenPercent = desiredFillSpecs.FillSpecs.Presure - oxygenFill
                }
            };
        }

        private decimal CalculateMaxDepth(decimal o2, decimal pp, MeasureMode system)
        {
            var mod = (pp / (o2 / 100) - 1) * 10;
            if(system == MeasureMode.Imperial)
                mod /= (decimal) 0.3048;

            return mod;
        }
    }
}
