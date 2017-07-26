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
                var fill = new CalculationResult
                {
                    System = request.System
                };

                if (request.FillSpecs.HeliumPercent == 0m)
                {
                    if (request.FillSpecs.OxegynPercent > 40m)
                        warnings.Add("Oxygen compatability required for this blend");

                    fill.FillSpecs = NitroxNoResidual(request);
                }
                    
                return fill;
            });
        }

        private TankInfo NitroxNoResidual(CalculationRequest desiredFillSpecs)
        {
            return new TankInfo
            {
                OxegynPercent = (desiredFillSpecs.FillSpecs.OxegynPercent / 100 - AirO2Percent) / AirNitrogenPercent * desiredFillSpecs.FillSpecs.Presure
            };
        }
    }
}
