
namespace core.bb.Models
{
    public sealed class CalculationRequest
    {
        public CalculationRequest()
        {
            TopOffGas = new Gas();
            FillSpecs = new TankInfo();
            Residual = new TankInfo();
            TopOffGasType = Models.TopOffGas.Air;
        }

        public MeasureMode System { get; set; }

        public TopOffGas TopOffGasType { get; set; }

        public Gas TopOffGas { get; set; }

        public TankInfo Residual { get; set; }

        public TankInfo FillSpecs { get; set; }
    }
}
