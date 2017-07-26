using System.Collections.Generic;

namespace core.bb.Models
{
    public sealed class CalculationResult
    {
        public CalculationResult()
        {
            Warnings = new string[0];   
        }

        public MeasureMode System { get; set; }

        public TankInfo FillSpecs { get; set; }

        public IEnumerable<string> Warnings { get; set; }
    }
}
