import { Component } from '@angular/core';
import { BlendCalculatorService } from '../../services/blendCalculator.service';
import { MeasureMode } from '../../models/calculator/measureMode';

@Component({
    selector: 'ead',
    templateUrl: './ead.component.html',
    styleUrls: ['./ead.component.css']
})
export class EadComponent {
    private readonly service: BlendCalculatorService;
    eadOxegenPercent: number;
    eadImperialSelected: boolean;
    eadMeasurement: string;
    eadValue: number;
    eadDepth: number;

    constructor(calculator: BlendCalculatorService) {
        this.service = calculator;
    }

    ngOnInit() {
        this.eadDepth = 0;
        this.eadOxegenPercent = 21;
        this.eadSystemSelectionChange(true);
    }

    eadSystemSelectionChange(value: boolean): void {
        this.eadImperialSelected = value;
        this.eadMeasurement = this.eadImperialSelected ? 'feet' : 'meeters';
        this.runCalculation();
    }

    eadUpdateOxygen(): void {
        if (this.eadOxegenPercent > 100)
            this.eadOxegenPercent = 100;
        if (this.eadOxegenPercent < 0)
            this.eadOxegenPercent = 0;

        this.runCalculation();
    }

    eadUpdateDepth(): void {
        this.runCalculation();
    }

    private runCalculation(): void {
        this.eadValue = this.service.calculateEad(
                this.eadOxegenPercent.toPercent(),
                this.eadDepth,
                this.eadImperialSelected
                    ? MeasureMode.Imperial
                    : MeasureMode.Metric
            );
    }
}