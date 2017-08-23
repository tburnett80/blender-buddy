import { Gas } from './gas';
import { TankInfo } from './tankInfo';
import { MeasureMode } from './measureMode';
import { TopOffGas } from './topOffGas';

export class CalculationRequest {
    public system: MeasureMode;
    public topOffGasType: TopOffGas;
    public topOffGasDetails: Gas;
    public residual: TankInfo;
    public fillSpecs: TankInfo;

    constructor() {
        this.system = MeasureMode.Imperial;
        this.topOffGasType = TopOffGas.Air;
        this.topOffGasDetails = new Gas();
        this.residual = new TankInfo();
        this.fillSpecs = new TankInfo();
    }
}