import { Component } from '@angular/core';
import { BlendCalculatorService } from '../../services/blendCalculator.service';
import { MeasureMode } from '../../models/calculator/measureMode';

@Component({
    selector: 'end',
    templateUrl: './end.component.html',
    styleUrls: ['./end.component.css']
})
export class EndComponent {
    private readonly service: BlendCalculatorService;
    endHeliumPercent: number;
    endImperialSelected: boolean;
    endMeasurement: string;
    endValue: number;
    endDepth: number;

    constructor(calculator: BlendCalculatorService) {
        this.service = calculator;
    }

    ngOnInit() {
        this.endDepth = 0;
        this.endHeliumPercent = 0;
        this.endSystemSelectionChange(true);
    }

    endSystemSelectionChange(value: boolean): void {
        this.endImperialSelected = value;
        this.endMeasurement = this.endImperialSelected ? 'feet' : 'meeters';
        this.runCalculation();
    }

    endUpdateHelium(): void {
        if (this.endHeliumPercent > 100)
            this.endHeliumPercent = 100;
        if (this.endHeliumPercent < 0)
            this.endHeliumPercent = 0;

        this.runCalculation();
    }

    endUpdateDepth(): void {
        this.runCalculation();
    }

    private runCalculation(): void {
        this.endValue = this.service.calculateEnd(
            this.endHeliumPercent.toPercent(),
            this.endDepth,
            this.endImperialSelected
            ? MeasureMode.Imperial
            : MeasureMode.Metric
        );
    }
}