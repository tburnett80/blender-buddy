import { Component, Output, EventEmitter } from '@angular/core';
import { Gas } from '../../models/calculator/gas';

@Component({
    selector: 'gas',
    templateUrl: './gas.component.html',
    styleUrls: ['./gas.component.css']
})
export class GasComponent {
    gas: Gas;

    @Output()
    gasUpdated: EventEmitter<Gas> = new EventEmitter<Gas>();

    constructor() {
        this.gas = new Gas();

        this.gas.helium = 0;
        this.gas.oxygen = 21;
        this.gas.nitrogen = 79;
    }

    ngOnInit() {
        this.updatePercents();
    }

    updatePercents(): void {
        if (this.gas.oxygen < 0)
            this.gas.oxygen = 0;

        if (this.gas.nitrogen < 0)
            this.gas.nitrogen = 0;

        if (this.gas.helium < 0)
            this.gas.helium = 0;

        if (this.gas.oxygen > 100)
            this.gas.oxygen = 100;

        if ((this.gas.oxygen + this.gas.helium) > 100)
            this.gas.helium = 100 - this.gas.oxygen;

        this.gas.nitrogen = 100 - (this.gas.oxygen + this.gas.helium);
        this.gasUpdated.emit(this.gas);
    }
}