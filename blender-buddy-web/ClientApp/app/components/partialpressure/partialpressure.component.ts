import { Component } from '@angular/core';
import { BlendCalculatorService } from '../../services/blendCalculator.service';
import { MeasureMode } from '../../models/calculator/measureMode';
import { Gas } from '../../models/calculator/gas';
import { PartialPressureRequest } from '../../models/calculator/partialPressureRequest';
import { PartialPressureResult } from '../../models/calculator/partialPressureResult';

@Component({
    selector: 'partialpressure',
    templateUrl: './partialpressure.component.html',
    styleUrls: ['./partialpressure.component.css']
})
export class PartialPressureComponent {
    private service: BlendCalculatorService;
    imperialSelected: boolean;
    measurement: string;
    depth: number;
    result: PartialPressureResult;
    gas: Gas;

    constructor(calculator: BlendCalculatorService) {
        this.service = calculator;
        this.gas = new Gas();
    }

    ngOnInit() {
        this.gas.oxygen = 21;
        this.gas.nitrogen = 79;
        this.gas.helium = 0;
        this.depth = 0;
        this.systemSelectionChange(true);
    }

    systemSelectionChange(value: boolean): void {
        this.imperialSelected = value;
        this.measurement = this.imperialSelected ? 'feet' : 'meeters';
        this.updateDepth();
    }

    updateGas(gas: Gas): void {
        this.gas = gas;
        let request = new PartialPressureRequest();
        request.depth = this.depth;
        request.gas = this.gas;
        request.system = this.imperialSelected ? MeasureMode.Imperial : MeasureMode.Metric;
        this.result = this.service.calculatePartialPressure(request);
    }

    updateDepth(): void {
        this.updateGas(this.gas);
    }
}