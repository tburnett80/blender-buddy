using System.Threading.Tasks;
using core.bb.Contracts.Engines;
using core.bb.Managers;
using core.bb.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

namespace core.bb.tests.ManagerTests
{
    [TestClass]
    public class CalculationManagerTests
    {
        [TestMethod]
        public async Task CalculateBasicTest()
        {
            //Arrange
            var engine = new Mock<IFillCalculatorEngine>();
            var request = new CalculationRequest();

            engine.Setup(e => e.CalculateFill(It.IsAny<CalculationRequest>()))
                .ReturnsAsync(new CalculationResult());

            //Act
            var manager = new CalculatorManager(engine.Object);
            var result = await manager.CalculateFill(request);

            //Assert
            Assert.IsNotNull(result, "Should return an object");
            Assert.IsInstanceOfType(result, typeof(CalculationResult), "Should be instance of this class");
        }
    }
}
