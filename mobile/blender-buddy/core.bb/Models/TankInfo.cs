
namespace core.bb.Models
{
    public sealed class TankInfo
    {
        public TankInfo()
        {
            GasBlend = new Gas();
        }

        public decimal Presure { get; set; }

        public Gas GasBlend { get; set; }
    }
}
