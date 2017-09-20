import { MeasureMode } from './measureMode';
import { Gas } from './gas';

export class PartialPressureRequest {
    public system: MeasureMode;
    public depth: number;
    public gas: Gas;

    constructor() {
        this.system = MeasureMode.Imperial;
        this.depth = 0;
        this.gas = new Gas();
        this.gas.oxygen = 21;
        this.gas.nitrogen = 79;
        this.gas.helium = 0;
    }
}