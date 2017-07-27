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
                if (request.FillSpecs.Helium == 0m)
                    return Nitrox(request);

                return new CalculationResult();
            });
        }

        private CalculationResult Nitrox(CalculationRequest desiredFillSpecs)
        {
            var warnings = new List<string>();
            if (desiredFillSpecs.FillSpecs.Oxygen > 40m)
                warnings.Add("Oxygen compatability required for this blend");

            decimal oxygenFillPercent;
            decimal tankPressure;
            if (desiredFillSpecs.Residual != null && desiredFillSpecs.Residual.Oxygen > 0m)
            {
                var desiredPercentOfTank = desiredFillSpecs.FillSpecs.Oxygen / 100 * desiredFillSpecs.FillSpecs.Presure;
                var residualMixOfTank = desiredFillSpecs.Residual.Oxygen / 100 * desiredFillSpecs.Residual.Presure;
                tankPressure = desiredFillSpecs.FillSpecs.Presure - desiredFillSpecs.Residual.Presure;
                oxygenFillPercent = (desiredPercentOfTank - residualMixOfTank) / tankPressure;
            }
            else
            {
                tankPressure = desiredFillSpecs.FillSpecs.Presure;
                oxygenFillPercent = desiredFillSpecs.FillSpecs.Oxygen.ToPercent();
            }

            var oxygenFill = CalculateOxegenFillPressure(oxygenFillPercent, tankPressure);
            var mod = CalculateMaxDepth(desiredFillSpecs.FillSpecs.Oxygen.ToPercent(), 1.4m, desiredFillSpecs.System).Round();

            return new CalculationResult
            {
                System = desiredFillSpecs.System,
                MaxDepth = mod,
                Po214Depth = mod,
                Po216Depth = CalculateMaxDepth(desiredFillSpecs.FillSpecs.Oxygen.ToPercent(), 1.6m, desiredFillSpecs.System).Round(),
                Warnings = warnings,
                FillSpecs = new TankInfo
                {
                    Oxygen = oxygenFill.Round(),
                    Air = tankPressure - oxygenFill.Round()
                }
            };
        }

        private decimal CalculateOxegenFillPressure(decimal oxygenPercent, decimal tankPressure)
        {
            return (oxygenPercent - AirO2Percent) / AirNitrogenPercent * tankPressure;
        }

        private decimal CalculateMaxDepth(decimal o2, decimal o2PartialPreasureLimit, MeasureMode system)
        {
            var mod = (o2PartialPreasureLimit / o2 - 1) * 33;
            if (system == MeasureMode.Metric)
                mod /= (decimal)3.28;
            
            return mod;
        }
    }
}
