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
    private readonly service: BlendCalculatorService;
    ppImperialSelected: boolean;
    ppMeasurement: string;
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
        this.ppSystemSelectionChange(true);
    }

    ppSystemSelectionChange(value: boolean): void {
        this.ppImperialSelected = value;
        this.ppMeasurement = this.ppImperialSelected ? 'feet' : 'meeters';
        this.ppUpdateDepth();
    }

    ppUpdateGas(gas: Gas): void {
        this.gas = gas;
        let request = new PartialPressureRequest();
        request.depth = this.depth;
        request.gas = this.gas;
        request.system = this.ppImperialSelected ? MeasureMode.Imperial : MeasureMode.Metric;
        this.result = this.service.calculatePartialPressure(request);
    }

    ppUpdateDepth(): void {
        this.ppUpdateGas(this.gas);
    }
}