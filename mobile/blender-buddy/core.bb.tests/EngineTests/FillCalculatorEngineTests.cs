using System.Threading.Tasks;
using core.bb.Engines;
using core.bb.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace core.bb.tests.EngineTests
{
    [TestClass]
    public class FillCalculatorEngineTests
    {
        [TestMethod]
        public async Task TestFillCalculateNitroxEmptyTank()
        {
            //Arrange
            var request = new CalculationRequest
            {
                System = MeasureMode.Imperial,
                FillSpecs = new TankInfo
                {
                    Presure = 3000m,
                    GasBlend = new Gas
                    {
                        Helium = 0m,
                        Oxygen = 32m
                    }
                }
            };

            //Act
            var engine = new FillCalculatorEngine();
            var result = await engine.CalculateFill(request);

            //Assert
            Assert.IsNotNull(result, "Should be an object");
            Assert.IsInstanceOfType(result, typeof(CalculationResult));
            Assert.AreEqual(request.System, result.System, "Should match");
            Assert.AreEqual(result.FillSpecs.GasBlend.Oxygen, 417.7m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.FillSpecs.GasBlend.Air, 2582.3m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.FillSpecs.GasBlend.Helium, 0m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.MaxDepth, result.Po214Depth, "Should be equal");
            Assert.AreEqual(result.Po214Depth, 111.4m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.Po216Depth, 132.0m, "Should be equal, matches PADI DSAT Gas mix calculator");

            //Arrange
            request = new CalculationRequest
            {
                System = MeasureMode.Metric,
                FillSpecs = new TankInfo
                {
                    Presure = 193m,
                    GasBlend = new Gas
                    {
                        Helium = 0m,
                        Oxygen = 30m
                    }
                }
            };

            //Act
            result = await engine.CalculateFill(request);

            //Assert
            Assert.IsNotNull(result, "Should be an object");
            Assert.IsInstanceOfType(result, typeof(CalculationResult));
            Assert.AreEqual(request.System, result.System, "Should match");
            Assert.AreEqual(result.FillSpecs.GasBlend.Oxygen, 22.0m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.FillSpecs.GasBlend.Air, 171.0m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.FillSpecs.GasBlend.Helium, 0m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.MaxDepth, result.Po214Depth, "Should be equal");
            Assert.AreEqual(result.Po214Depth, 36.9m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.Po216Depth, 43.6m, "Should be equal, matches PADI DSAT Gas mix calculator");
        }

        [TestMethod]
        public async Task TestFillCalculateNitroxWithResidualGas()
        {
            //Arrange
            var request = new CalculationRequest
            {
                System = MeasureMode.Imperial,
                FillSpecs = new TankInfo
                {
                    Presure = 3000m,
                    GasBlend = new Gas
                    {
                        Helium = 0m,
                        Oxygen = 36m
                    }
                },
                Residual = new TankInfo
                {
                    Presure = 1000m,
                    GasBlend = new Gas
                    {
                        Helium = 0m,
                        Oxygen = 30m
                    }
                }
            };

            //Act
            var engine = new FillCalculatorEngine();
            var result = await engine.CalculateFill(request);

            //Assert
            Assert.IsNotNull(result, "Should be an object");
            Assert.IsInstanceOfType(result, typeof(CalculationResult));
            Assert.AreEqual(request.System, result.System, "Should match");
            Assert.AreEqual(result.FillSpecs.GasBlend.Oxygen, 455.7m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.FillSpecs.GasBlend.Air, 1544.3m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.FillSpecs.GasBlend.Helium, 0m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.MaxDepth, result.Po214Depth, "Should be equal");
            Assert.AreEqual(result.Po214Depth, 95.3m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.Po216Depth, 113.7m, "Should be equal, matches PADI DSAT Gas mix calculator");

            //Arrange
            request = new CalculationRequest
            {
                System = MeasureMode.Metric,
                FillSpecs = new TankInfo
                {
                    Presure = 165.4m,
                    GasBlend = new Gas
                    {
                        Helium = 0m,
                        Oxygen = 34m
                    }
                },
                Residual = new TankInfo
                {
                    Presure = 36.2m,
                    GasBlend = new Gas
                    {
                        Helium = 0m,
                        Oxygen = 38m
                    }
                }
            };

            //Act
            result = await engine.CalculateFill(request);

            //Assert
            Assert.IsNotNull(result, "Should be an object");
            Assert.IsInstanceOfType(result, typeof(CalculationResult));
            Assert.AreEqual(request.System, result.System, "Should match");
            Assert.AreEqual(result.FillSpecs.GasBlend.Oxygen, 19.4m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.FillSpecs.GasBlend.Air, 109.8m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.FillSpecs.GasBlend.Helium, 0m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.MaxDepth, result.Po214Depth, "Should be equal");
            Assert.AreEqual(result.Po214Depth, 31.4m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.Po216Depth, 37.3m, "Should be equal, matches PADI DSAT Gas mix calculator");
        }

        //[TestMethod]
        public async Task TestFillCalculateTrimixEmptyTank()
        {
            //Arrange
            var request = new CalculationRequest
            {
                System = MeasureMode.Imperial,
                FillSpecs = new TankInfo
                {
                    Presure = 3000m,
                    GasBlend = new Gas
                    {
                        Helium = 40m,
                        Oxygen = 32m
                    }
                }
            };

            //Act
            var engine = new FillCalculatorEngine();
            var result = await engine.CalculateFill(request);

            //Assert
            Assert.IsNotNull(result, "Should be an object");
            Assert.IsInstanceOfType(result, typeof(CalculationResult));
            Assert.AreEqual(request.System, result.System, "Should match");
            Assert.AreEqual(result.FillSpecs.GasBlend.Oxygen, 417.7m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.FillSpecs.GasBlend.Air, 2582.3m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.FillSpecs.GasBlend.Helium, 0m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.MaxDepth, result.Po214Depth, "Should be equal");
            Assert.AreEqual(result.Po214Depth, 111.4m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.Po216Depth, 132.0m, "Should be equal, matches PADI DSAT Gas mix calculator");
        }
    }
}
