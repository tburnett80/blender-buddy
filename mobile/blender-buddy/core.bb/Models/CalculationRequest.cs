
namespace core.bb.Models
{
    public sealed class CalculationRequest
    {
        public CalculationRequest()
        {
            FillSpecs = new TankInfo
            {
                Air = 0m,
                Helium = 0m,
                Nitrogen = 0m,
                Oxygen = 0m,
                Presure = 0m
            };

            Residual = new TankInfo
            {
                Air = 0m,
                Helium = 0m,
                Nitrogen = 0m,
                Oxygen = 0m,
                Presure = 0m
            };
        }

        public MeasureMode System { get; set; }

        public TankInfo Residual { get; set; }

        public TankInfo FillSpecs { get; set; }
    }
}
