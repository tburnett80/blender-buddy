import { TankInfo } from './TankInfo';

export class CalculationResult {
    system: MeasureMode;
    topOffGasType: TopOffGas;
    fillSpecs: TankInfo;
    maxDepth: number;
    pO214Depth: number;
    pO216Depth: number;
    hypoxicDepth: number;
    topOffGas: number;
    warnings: string[];

    constructor() {
        this.system = MeasureMode.Imperial;
        this.topOffGasType = TopOffGas.Air;
        this.fillSpecs = new TankInfo();
    }
}