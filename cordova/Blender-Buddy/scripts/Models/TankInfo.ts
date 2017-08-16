import { Gas } from "./Gas";

export class TankInfo {
    pressure: number;
    gasBlend: Gas;

    constructor() {
        this.gasBlend = new Gas();
        this.pressure = 0;
    }
}