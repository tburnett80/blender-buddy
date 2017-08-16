import { Gas } from './Gas';
import { TankInfo } from './TankInfo';

export class CalculationRequest {
    system: MeasureMode;
    topOffGasType: TopOffGas;
    topOffGas: Gas;
    residual: TankInfo;
    fillSpecs: TankInfo;

    constructor() {
        this.system = MeasureMode.Imperial;
        this.topOffGasType = TopOffGas.Air;
        this.topOffGas = new Gas();
        this.residual = new TankInfo();
        this.fillSpecs = new TankInfo();
    }
}