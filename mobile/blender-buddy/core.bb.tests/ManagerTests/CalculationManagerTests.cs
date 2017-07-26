using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using core.bb.Managers;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using core.bb.Models;

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
        }
    }
}
