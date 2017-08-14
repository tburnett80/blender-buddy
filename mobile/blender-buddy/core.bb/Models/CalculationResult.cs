using System.Collections.Generic;

namespace core.bb.Models
{
    public sealed class CalculationResult
    {
        public CalculationResult()
        {
            FillSpecs = new TankInfo();
            Warnings = new string[0];   
        }

        public MeasureMode System { get; set; }

        public decimal MaxDepth { get; set; }

        public decimal Po214Depth { get; set; }

        public decimal Po216Depth { get; set; }

        public decimal HypoxicDepth { get; set; }

        public decimal TopOffGas { get; set; }

        public TopOffGas TopOffGasType { get; set; }

        public TankInfo FillSpecs { get; set; }

        public IEnumerable<string> Warnings { get; set; }
    }
}
