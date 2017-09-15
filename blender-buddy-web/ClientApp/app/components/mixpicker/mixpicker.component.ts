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
    imperialSelected: boolean;
    measurement: string;
    depth: number;
    mix: string;

    constructor(calculator: BlendCalculatorService) {
        this.service = calculator;
        this.depth = 0;
        this.mix = 'EANx 21 (Air)';
    }

    ngOnInit() {
        this.systemSelectionChange(true);
    }

    systemSelectionChange(value: boolean): void {
        this.imperialSelected = value;
        this.measurement = this.imperialSelected ? 'feet' : 'meeters';
        this.updateDepth();
    }

    updateDepth(): void {
        if (this.depth < 1) {
            this.mix = 'EANx 21 (Air)';
            return;
        }

        const result = this.service.calculateOptimalMix(this.depth,
            this.imperialSelected ? MeasureMode.Imperial : MeasureMode.Metric);

        if (result === 21) {
            this.mix = 'EANx 21 (Air)';
        } else if (result < 18) {
            this.mix = 'Trimix + Travel Gas';
        } else {
            this.mix = 'EANx ' + result;
        }
    }
}
