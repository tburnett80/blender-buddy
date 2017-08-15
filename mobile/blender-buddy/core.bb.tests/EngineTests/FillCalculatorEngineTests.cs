﻿using System.Linq;
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
            Assert.AreEqual(request.TopOffGasType, result.TopOffGasType, "Should match");
            Assert.AreEqual(result.TopOffGas, 2582.3m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.FillSpecs.GasBlend.Oxygen, 417.7m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.FillSpecs.GasBlend.Helium, 0m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.MaxDepth, result.Po214Depth, "Should be equal");
            Assert.AreEqual(result.Po214Depth, 111.4m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.Po216Depth, 132.0m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.HypoxicDepth, -14.4m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(0, result.Warnings.Count(), "Should be no warnings");

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
            Assert.AreEqual(request.TopOffGasType, result.TopOffGasType, "Should match");
            Assert.AreEqual(result.TopOffGas, 171.0m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.FillSpecs.GasBlend.Oxygen, 22.0m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.FillSpecs.GasBlend.Helium, 0m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.MaxDepth, result.Po214Depth, "Should be equal");
            Assert.AreEqual(result.Po214Depth, 36.9m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.Po216Depth, 43.6m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.HypoxicDepth, -4m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(0, result.Warnings.Count(), "Should be no warnings");
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
            Assert.AreEqual(request.TopOffGasType, result.TopOffGasType, "Should match");
            Assert.AreEqual(result.TopOffGas, 1544.3m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.FillSpecs.GasBlend.Oxygen, 455.7m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.FillSpecs.GasBlend.Helium, 0m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.MaxDepth, result.Po214Depth, "Should be equal");
            Assert.AreEqual(result.Po214Depth, 95.3m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.Po216Depth, 113.7m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.HypoxicDepth, -16.5m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(0, result.Warnings.Count(), "Should be no warnings");

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
            Assert.AreEqual(request.TopOffGasType, result.TopOffGasType, "Should match");
            Assert.AreEqual(result.TopOffGas, 109.8m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.FillSpecs.GasBlend.Oxygen, 19.4m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.FillSpecs.GasBlend.Helium, 0m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.MaxDepth, result.Po214Depth, "Should be equal");
            Assert.AreEqual(result.Po214Depth, 31.4m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.Po216Depth, 37.3m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.HypoxicDepth, -4.7m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(0, result.Warnings.Count(), "Should be no warnings");
        }

        [TestMethod]
        public async Task TestFillCalculateNitroxEmptyTank_CustomMixTopOff()
        {
            //Arrange
            var request = new CalculationRequest
            {
                System = MeasureMode.Imperial,
                TopOffGasType = TopOffGas.Custom,
                TopOffGas = new Gas
                {
                    Oxygen = 21m
                },
                FillSpecs = new TankInfo
                {
                    Presure = 2800m,
                    GasBlend = new Gas
                    {
                        Oxygen = 36m
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
            Assert.AreEqual(request.TopOffGasType, result.TopOffGasType, "Should match");
            Assert.AreEqual(result.TopOffGas, 2268.4m, "Should be equal, matches PADI DSAT Gas mix calculator, rouding is off by .1 due to how C# rounds .35 to .4 insetad of .3");
            Assert.AreEqual(result.FillSpecs.GasBlend.Oxygen, 531.6m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.FillSpecs.GasBlend.Helium, 0m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.MaxDepth, result.Po214Depth, "Should be equal");
            Assert.AreEqual(result.Po214Depth, 95.3m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.Po216Depth, 113.7m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.HypoxicDepth, -16.5m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(0, result.Warnings.Count(), "Should be no warnings");

            //Arrange
            request = new CalculationRequest
            {
                System = MeasureMode.Metric,
                TopOffGasType = TopOffGas.Custom,
                TopOffGas = new Gas
                {
                    Oxygen = 21m
                },
                FillSpecs = new TankInfo
                {
                    Presure = 193m,
                    GasBlend = new Gas
                    {
                        Oxygen = 36m
                    }
                }
            };

            //Act
            result = await engine.CalculateFill(request);

            //Assert
            Assert.IsNotNull(result, "Should be an object");
            Assert.IsInstanceOfType(result, typeof(CalculationResult));
            Assert.AreEqual(request.System, result.System, "Should match");
            Assert.AreEqual(request.TopOffGasType, result.TopOffGasType, "Should match");
            Assert.AreEqual(result.TopOffGas, 156.4m, "Should be equal, matches PADI DSAT Gas mix calculator, rouding is off by .1 due to how C# rounds .35 to .4 insetad of .3");
            Assert.AreEqual(result.FillSpecs.GasBlend.Oxygen, 36.6m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.FillSpecs.GasBlend.Helium, 0m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.MaxDepth, result.Po214Depth, "Should be equal");
            Assert.AreEqual(result.Po214Depth, 29.1m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.Po216Depth, 34.7m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.HypoxicDepth, -5m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(0, result.Warnings.Count(), "Should be no warnings");
        }

        [TestMethod]
        public async Task TestFillCalculateNitroxEmpty_EAN32TopOff()
        {
            //Arrange
            var request = new CalculationRequest
            {
                System = MeasureMode.Imperial,
                TopOffGasType = TopOffGas.Ean32,
                FillSpecs = new TankInfo
                {
                    Presure = 2400m,
                    GasBlend = new Gas
                    {
                        Oxygen = 36m
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
            Assert.AreEqual(request.TopOffGasType, result.TopOffGasType, "Should match");
            Assert.AreEqual(result.TopOffGas, 2258.8m, "Should be equal, matches PADI DSAT Gas mix calculator, rouding is off by .1 due to how C# rounds .35 to .4 insetad of .3");
            Assert.AreEqual(result.FillSpecs.GasBlend.Oxygen, 141.2m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.FillSpecs.GasBlend.Helium, 0m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.MaxDepth, result.Po214Depth, "Should be equal");
            Assert.AreEqual(result.Po214Depth, 95.3m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.Po216Depth, 113.7m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.HypoxicDepth, -16.5m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(0, result.Warnings.Count(), "Should be no warnings");
        }

        [TestMethod]
        public async Task TestFillCalculateNitroxEmpty_EAN36TopOff()
        {
            //Arrange
            var request = new CalculationRequest
            {
                System = MeasureMode.Imperial,
                TopOffGasType = TopOffGas.Ean36,
                FillSpecs = new TankInfo
                {
                    Presure = 3000m,
                    GasBlend = new Gas
                    {
                        Oxygen = 40m
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
            Assert.AreEqual(request.TopOffGasType, result.TopOffGasType, "Should match");
            Assert.AreEqual(result.TopOffGas, 2812.5m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.FillSpecs.GasBlend.Oxygen, 187.5m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.FillSpecs.GasBlend.Helium, 0m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.MaxDepth, result.Po214Depth, "Should be equal");
            Assert.AreEqual(result.Po214Depth, 82.5m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.Po216Depth, 99m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.HypoxicDepth, -18.2m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(0, result.Warnings.Count(), "Should be no warnings");
        }

        [TestMethod]
        public async Task TestFillCalculateTrimix_HeliairEmptyTank()
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
            Assert.AreEqual(request.TopOffGasType, result.TopOffGasType, "Should match");
            Assert.AreEqual(result.TopOffGas, 1063.3m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.FillSpecs.GasBlend.Oxygen, 736.7m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.FillSpecs.GasBlend.Helium, 1200m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.MaxDepth, result.Po214Depth, "Should be equal");
            Assert.AreEqual(result.Po214Depth, 111.4m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.Po216Depth, 132m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.HypoxicDepth, -14.4m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(0, result.Warnings.Count(), "Should be no warnings");

            //Arrange
            request = new CalculationRequest
            {
                System = MeasureMode.Metric,
                FillSpecs = new TankInfo
                {
                    Presure = 200m,
                    GasBlend = new Gas
                    {
                        Helium = 40m,
                        Oxygen = 19m
                    }
                }
            };

            //Act
            result = await engine.CalculateFill(request);

            //Assert
            Assert.IsNotNull(result, "Should be an object");
            Assert.IsInstanceOfType(result, typeof(CalculationResult));
            Assert.AreEqual(request.System, result.System, "Should match");
            Assert.AreEqual(request.TopOffGasType, result.TopOffGasType, "Should match");
            Assert.AreEqual(result.TopOffGas, 103.8m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.FillSpecs.GasBlend.Oxygen, 16.2m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.FillSpecs.GasBlend.Helium, 80m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.MaxDepth, result.Po214Depth, "Should be equal");
            Assert.AreEqual(result.Po214Depth, 64.1m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.Po216Depth, 74.7m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.HypoxicDepth, -0.5m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(0, result.Warnings.Count(), "Should be no warnings");
        }

        [TestMethod]
        public async Task TestFillCalculateTrimix_HeliairResidualGas()
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
                        Oxygen = 30m
                    }
                },
                Residual = new TankInfo
                {
                    Presure = 1000m,
                    GasBlend = new Gas
                    {
                        Helium = 10m,
                        Oxygen = 25m
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
            Assert.AreEqual(request.TopOffGasType, result.TopOffGasType, "Should match");
            Assert.AreEqual(result.TopOffGas, 316.5m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.FillSpecs.GasBlend.Oxygen, 583.5m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.FillSpecs.GasBlend.Helium, 1100m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.MaxDepth, result.Po214Depth, "Should be equal");
            Assert.AreEqual(result.Po214Depth, 121m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.Po216Depth, 143m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.HypoxicDepth, -13.2m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(0, result.Warnings.Count(), "Should be no warnings");

            //Arrange
            request = new CalculationRequest
            {
                System = MeasureMode.Metric,
                FillSpecs = new TankInfo
                {
                    Presure = 200m,
                    GasBlend = new Gas
                    {
                        Helium = 35m,
                        Oxygen = 28m
                    }
                },
                Residual = new TankInfo
                {
                    Presure = 50m,
                    GasBlend = new Gas
                    {
                        Helium = 15m,
                        Oxygen = 23m
                    }
                }
            };

            //Act
            result = await engine.CalculateFill(request);

            //Assert
            Assert.IsNotNull(result, "Should be an object");
            Assert.IsInstanceOfType(result, typeof(CalculationResult));
            Assert.AreEqual(request.System, result.System, "Should match");
            Assert.AreEqual(request.TopOffGasType, result.TopOffGasType, "Should match");
            Assert.AreEqual(result.TopOffGas, 54.4m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.FillSpecs.GasBlend.Oxygen, 33.1m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.FillSpecs.GasBlend.Helium, 62.5m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.MaxDepth, result.Po214Depth, "Should be equal");
            Assert.AreEqual(result.Po214Depth, 40.2m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.Po216Depth, 47.4m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(result.HypoxicDepth, -3.6m, "Should be equal, matches PADI DSAT Gas mix calculator");
            Assert.AreEqual(0, result.Warnings.Count(), "Should be no warnings");
        }

        [TestMethod]
        public async Task TestFillHighO2Warning()
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
                        Oxygen = 45m
                    }
                }
            };

            //Act
            var engine = new FillCalculatorEngine();
            var result = await engine.CalculateFill(request);

            //Assert
            Assert.IsNotNull(result, "Should be an object");
            Assert.IsInstanceOfType(result, typeof(CalculationResult));
            Assert.AreEqual(1, result.Warnings.Count(), "Should be no warnings");
            Assert.AreEqual("Oxygen compatability required for this blend", result.Warnings.FirstOrDefault(), "Should be no warnings");
        }

        [TestMethod]
        public async Task TestFillHypoxicWarning()
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
                        Helium = 45m,
                        Oxygen = 15m
                    }
                }
            };

            //Act
            var engine = new FillCalculatorEngine();
            var result = await engine.CalculateFill(request);

            //Assert
            Assert.IsNotNull(result, "Should be an object");
            Assert.IsInstanceOfType(result, typeof(CalculationResult));
            Assert.AreEqual(1, result.Warnings.Count(), "Should be no warnings");
            Assert.AreEqual("Travel Gas required for this blend", result.Warnings.FirstOrDefault(), "Should be no warnings");
        }

        [TestMethod]
        public async Task TestFillInvalidBlendWarning()
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
                        Oxygen = 28m
                    }
                },
                Residual = new TankInfo
                {
                    Presure = 1600m,
                    GasBlend = new Gas
                    {
                        Helium = 0m,
                        Oxygen = 40m
                    }
                }
            };

            //Act
            var engine = new FillCalculatorEngine();
            var result = await engine.CalculateFill(request);

            //Assert
            Assert.IsNotNull(result, "Should be an object");
            Assert.IsInstanceOfType(result, typeof(CalculationResult));
            Assert.AreEqual(1, result.Warnings.Count(), "Should be no warnings");
            Assert.AreEqual("Cannot achieve this blend, please empty the tank and start over empty.", result.Warnings.FirstOrDefault(), "Should be no warnings");
        }
    }
}
