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
    public topOffGasPressure: number;
    public warnings: string[];

    constructor() {
        this.system = MeasureMode.Imperial;
        this.topOffGasType = TopOffGas.Air;
        this.fillSpecs = new TankInfo();
        this.maxDepth = 0;
        this.pO214Depth = 0;
        this.pO216Depth = 0;
        this.hypoxicDepth = 0;
        this.topOffGasPressure = 0;
        this.warnings = [];
    }
}