import { TankInfo } from './tankInfo';
import { MeasureMode } from './measureMode';
import { TopOffGas } from './topOffGas';

export class CalculationResult {
    public system: MeasureMode;
    public topOffGasType: TopOffGas;
    public fillSpecs: TankInfo;
    public maxDepth: number;
    public pO214Depth: number;
    public pO216Depth: number;
    public hypoxicDepth: number;
    public topOffGas: number;
    public warnings: string[];

    constructor() {
        this.system = MeasureMode.Imperial;
        this.topOffGasType = TopOffGas.Air;
        this.fillSpecs = new TankInfo();
    }
}