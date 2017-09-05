
import { Gas } from './gas';

export class TankInfo {
    public pressure: number;
    public gasBlend: Gas;

    constructor() {
        this.gasBlend = new Gas();
        this.pressure = -1;
    }
}