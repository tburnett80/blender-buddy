import { Component } from '@angular/core';
import { BlendCalculatorService } from '../../services/blendCalculator.service';
import { MeasureMode } from '../../models/calculator/measureMode';

@Component({
    selector: 'mixpicker',
    templateUrl: './mixpicker.component.html',
    styleUrls: ['./mixpicker.component.css']
})
export class MixPickerComponent {
    private readonly service: BlendCalculatorService;
    mixImperialSelected: boolean;
    mixMeasurement: string;
    depth: number;
    mix: string;

    constructor(calculator: BlendCalculatorService) {
        this.service = calculator;
        this.depth = 0;
        this.mix = 'EANx 21 (Air)';
    }

    ngOnInit() {
        this.mixSystemSelectionChange(true);
    }

    mixSystemSelectionChange(value: boolean): void {
        this.mixImperialSelected = value;
        this.mixMeasurement = this.mixImperialSelected ? 'feet' : 'meeters';
        this.updateDepth();
    }

    updateDepth(): void {
        if (this.depth < 1) {
            this.mix = 'EANx 21 (Air)';
            return;
        }

        const result = this.service.calculateOptimalMix(this.depth,
            this.mixImperialSelected ? MeasureMode.Imperial : MeasureMode.Metric);

        if (result === 21) {
            this.mix = 'EANx 21 (Air)';
        } else if (result < 18) {
            this.mix = 'Trimix + Travel Gas';
        } else {
            this.mix = 'EANx ' + result;
        }
    }
}
