using System.Threading.Tasks;
using core.bb.Managers;
using core.bb.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace core.bb.tests.ManagerTests
{
    [TestClass]
    public class CalculationManagerTests
    {
        [TestMethod]
        public async Task CalculateBasicTest()
        {
            //Arrange
            var request = new CalculationRequest();

            //Act
            var manager = new CalculatorManager();
            var result = await manager.CalculateFill(request);

            //Assert
            Assert.IsNotNull(result, "Should return an object");
            Assert.IsInstanceOfType(result, typeof(CalculationResult), "Should be instance of this class");
        }
    }
}
