using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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
                    Helium = 0m,
                    Oxegyn = 32m,
                    Presure = 3000m
                }
            };

            //Act
            var engine = new FillCalculatorEngine();
            var result = await engine.CalculateFill(request);

            //Assert
            Assert.IsNotNull(result, "Should be an object");
            Assert.IsInstanceOfType(result, typeof(CalculationResult));
            Assert.AreEqual(request.System, result.System, "Should match");
            Assert.AreEqual(result.FillSpecs.Oxegyn, 417.7m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.FillSpecs.Nitrogen, 2582.3m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.FillSpecs.Helium, 0m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.MaxDepth, result.Po214Depth, "Should be equal");
            Assert.AreEqual(result.Po214Depth, 111.4m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.Po216Depth, 132.0m, "Should be equal, matches PADI DSAT Gas mix calculator");

            //Arrange
            request = new CalculationRequest
            {
                System = MeasureMode.Metric,
                FillSpecs = new TankInfo
                {
                    Helium = 0m,
                    Oxegyn = 30m,
                    Presure = 193m
                }
            };

            //Act
            result = await engine.CalculateFill(request);

            //Assert
            Assert.IsNotNull(result, "Should be an object");
            Assert.IsInstanceOfType(result, typeof(CalculationResult));
            Assert.AreEqual(request.System, result.System, "Should match");
            Assert.AreEqual(result.FillSpecs.Oxegyn, 22.0m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.FillSpecs.Nitrogen, 171.0m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.FillSpecs.Helium, 0m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.MaxDepth, result.Po214Depth, "Should be equal");
            Assert.AreEqual(result.Po214Depth, 36.9m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.Po216Depth, 43.6m, "Should be equal, matches PADI DSAT Gas mix calculator");
        }
    }
}
