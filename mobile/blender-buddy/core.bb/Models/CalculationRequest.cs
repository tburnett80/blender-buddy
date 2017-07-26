
namespace core.bb.Models
{
    public sealed class CalculationRequest
    {
        public MeasureMode System { get; set; }

        public TankInfo Residual { get; set; }

        public TankInfo FillSpecs { get; set; }
    }
}
