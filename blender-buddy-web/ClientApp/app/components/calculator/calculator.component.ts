import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { CalculationRequest } from '../../models/calculator/calculationRequest';
import { CalculationResult } from '../../models/calculator/calculationResult';

import { MeasureModeService } from '../../services/measure-system.service';
import { BlendCalculatorService } from '../../services/blendCalculator.service';

@Component({
    selector: 'calculator',
    templateUrl: './calculator.component.html',
    styleUrls: ['./calculator.component.css'],
    providers: [ BlendCalculatorService ]
})
export class CalculatorComponent {
    measureModeService: MeasureModeService;
    blendCalculator: BlendCalculatorService;

    imperialSubscription: Subscription;
    measurePreasureSubscription: Subscription;
    measureDistanceSubscription: Subscription;

    imperialSelected: boolean;
    measurePreasure: string;
    measureDistance: string;

    constructor(measureModeService: MeasureModeService, blendCalculator: BlendCalculatorService) {
        this.measureModeService = measureModeService;
        this.blendCalculator = blendCalculator;
        this.systemSelectionChange(true);
    }

    ngOnInit() {
        this.imperialSubscription =
            this.measureModeService.imperialSelected.subscribe(value => this.imperialSelected = value);

        this.measurePreasureSubscription =
            this.measureModeService.measurePreasure.subscribe(value => this.measurePreasure = value);

        this.measureDistanceSubscription =
            this.measureModeService.measureDistance.subscribe(value => this.measureDistance = value);
    }

    ngOnDestroy() {
        this.imperialSubscription.unsubscribe();
        this.measurePreasureSubscription.unsubscribe();
        this.measureDistanceSubscription.unsubscribe();
    }

    systemSelectionChange(entry: boolean): void {
        this.measureModeService.updateSystemSelection(entry);
    }
}