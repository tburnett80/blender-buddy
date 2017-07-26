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
                if (request.FillSpecs.HeliumPercent == 0m)
                {
                    return NitroxNoResidual(request);
                }

                return new CalculationResult();
            });
        }

        private CalculationResult NitroxNoResidual(CalculationRequest desiredFillSpecs)
        {
            var warnings = new List<string>();
            if (desiredFillSpecs.FillSpecs.Oxegyn > 40m)
                warnings.Add("Oxygen compatability required for this blend");

            var oxygenFill = (desiredFillSpecs.FillSpecs.Oxegyn / 100 - AirO2Percent) / AirNitrogenPercent * desiredFillSpecs.FillSpecs.Presure;
            var mod = CalculateMaxDepth(desiredFillSpecs.FillSpecs.Oxegyn, 1.4m, desiredFillSpecs.System).Round();

            return new CalculationResult
            {
                System = desiredFillSpecs.System,
                MaxDepth = mod,
                Po214Depth = mod,
                Po216Depth = CalculateMaxDepth(desiredFillSpecs.FillSpecs.Oxegyn, 1.6m, desiredFillSpecs.System).Round(),
                Warnings = warnings,
                FillSpecs = new TankInfo
                {
                    Oxegyn = oxygenFill.Round(),
                    Nitrogen = desiredFillSpecs.FillSpecs.Presure - oxygenFill.Round()
                }
            };
        }

        private decimal CalculateMaxDepth(decimal o2, decimal pp, MeasureMode system)
        {
            var mod = (pp / (o2 / 100) - 1) * 33;
            if (system == MeasureMode.Metric)
                mod /= (decimal)3.28;
            
            return mod;
        }
    }
}
