using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using core.bb.Contracts.Engines;
using core.bb.Extensions;
using core.bb.Models;

namespace core.bb.Engines
{
    internal sealed class FillCalculatorEngine : IFillCalculatorEngine
    {
        // ReSharper disable InconsistentNaming
        private const decimal AirO2Percent = 0.21m;
        private const decimal Ean32_02Percent = 0.32m;
        private const decimal Ean36_02Percent = 0.36m;
        private const decimal MinPpo2 = 0.18m;
        // ReSharper restore InconsistentNaming

        public async Task<CalculationResult> CalculateFill(CalculationRequest request)
        {
            return await Task.Run(() => 
                request.FillSpecs.GasBlend.Helium > 0m
                    ? Trimix(request)
                    : Nitrox(request));
        }

        private CalculationResult Trimix(CalculationRequest desiredFillSpecs)
        {

            return null;
        }

        private CalculationResult Nitrox(CalculationRequest desiredFillSpecs)
        {
            var warnings = new List<string>();
            if (desiredFillSpecs.FillSpecs.GasBlend.Oxygen > 40m)
                warnings.Add("Oxygen compatability required for this blend");

            //Determin Oxygen fill percent needed for blend, and the pressure needed
            decimal oxygenFillPercent;
            decimal tankPressure;
            if (desiredFillSpecs.Residual != null && desiredFillSpecs.Residual.GasBlend.Oxygen > 0m)
            {
                var desiredPercentOfTank = desiredFillSpecs.FillSpecs.GasBlend.Oxygen.ToPercent() * desiredFillSpecs.FillSpecs.Presure;
                var residualMixOfTank = desiredFillSpecs.Residual.GasBlend.Oxygen.ToPercent() * desiredFillSpecs.Residual.Presure;
                tankPressure = desiredFillSpecs.FillSpecs.Presure - desiredFillSpecs.Residual.Presure;
                oxygenFillPercent = (desiredPercentOfTank - residualMixOfTank) / tankPressure;
            }
            else
            {   //Empty tank fill
                tankPressure = desiredFillSpecs.FillSpecs.Presure;
                oxygenFillPercent = desiredFillSpecs.FillSpecs.GasBlend.Oxygen.ToPercent();
            }

            //Calculate how much Oxygen preasure required to achieve the desired blend
            var oxygenFill = CalculateOxegenFillPressure(oxygenFillPercent, DeterminTopOffOxygen(desiredFillSpecs.TopOffGasType, desiredFillSpecs.TopOffGas), DeterminTopOffNitrogen(desiredFillSpecs.TopOffGasType, desiredFillSpecs.TopOffGas), tankPressure);
            var mod = CalculateMaxDepth(desiredFillSpecs.FillSpecs.GasBlend.Oxygen.ToPercent(), 1.4m, desiredFillSpecs.System).Round();

            return new CalculationResult
            {
                System = desiredFillSpecs.System,
                MaxDepth = mod,
                Po214Depth = mod,
                Po216Depth = CalculateMaxDepth(desiredFillSpecs.FillSpecs.GasBlend.Oxygen.ToPercent(), 1.6m, desiredFillSpecs.System).Round(),
                HypoxicDepth = CalculateHypoxicDepth(desiredFillSpecs.FillSpecs.GasBlend.Oxygen.ToPercent(), desiredFillSpecs.System).Round(),
                Warnings = warnings,
                TopOffGas = tankPressure - oxygenFill.Round(),
                TopOffGasType = desiredFillSpecs.TopOffGasType,
                FillSpecs = new TankInfo
                {
                    GasBlend = new Gas
                    {
                        Oxygen = oxygenFill.Round()
                    }
                }
            };
        }

        private decimal CalculateOxegenFillPressure(decimal oxygenPercent, decimal topOffOxygenPercent, decimal nitrogenPercent, decimal tankPressure)
        {
            return (oxygenPercent - topOffOxygenPercent) / nitrogenPercent * tankPressure;
        }

        private decimal CalculateMaxDepth(decimal o2, decimal o2PartialPreasureLimit, MeasureMode system)
        {
            var mod = (o2PartialPreasureLimit / o2 - 1) * 33;
            if (system == MeasureMode.Metric)
                mod /= (decimal)3.28;
            
            return mod;
        }

        private decimal CalculateHypoxicDepth(decimal o2, MeasureMode system, decimal o2PartialPreasureCeiling = MinPpo2)
        {
            var ceil = (o2PartialPreasureCeiling / o2 - 1) * 33;
            if (system == MeasureMode.Metric)
                ceil /= (decimal)3.28;

            return ceil;
        }

        private decimal DeterminTopOffOxygen(TopOffGas gasType, Gas gas = null)
        {
            switch (gasType)
            {
                case TopOffGas.Air:
                    return AirO2Percent;
                case TopOffGas.Ean32:
                    return Ean32_02Percent;
                case TopOffGas.Ean36:
                    return Ean36_02Percent;
                case TopOffGas.Custom:
                    return gas?.Oxygen.ToPercent() ?? throw new Exception("Could not determin Top off Oxygen. Empty tank and start over.");
                default:
                    throw new Exception("Could not determin Top off Oxygen. Empty tank and start over.");
            }
        }

        private decimal DeterminTopOffNitrogen(TopOffGas gasType, Gas gas = null)
        {
            switch (gasType)
            {
                case TopOffGas.Air:
                    return 1m - AirO2Percent;
                case TopOffGas.Ean32:
                    return 1m - Ean32_02Percent;
                case TopOffGas.Ean36:
                    return 1m - Ean36_02Percent;
                case TopOffGas.Custom:
                    if (gas == null)
                        throw new Exception("Could not determin Top off Nitrogen. Empty tank and start over.");
                    return (100 - gas.Oxygen + gas.Helium).ToPercent();
                default:
                    throw new Exception("Could not determin Top off Nitrogen. Empty tank and start over.");
            }
        }

        //private decimal CalculateNitrogenPercent(TankInfo tank)
        //{
        //    if (tank.GasBlend.Air > 0)
        //        return AirNitrogenPercent;

        //    if(tank.Presure == 0 || tank.Presure < tank.GasBlend.Oxygen + tank.GasBlend.Helium)
        //        throw new Exception("Cannot calculate Nitrogen based on available information. Empty tank to continue.");

        //    return (tank.Presure - (tank.GasBlend.Oxygen + tank.GasBlend.Helium)) / tank.Presure;
        //}
    }
}
