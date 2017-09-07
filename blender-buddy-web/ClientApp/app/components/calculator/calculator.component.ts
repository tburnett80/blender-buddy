import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { CalculationRequest } from '../../models/calculator/calculationRequest';
import { CalculationResult } from '../../models/calculator/calculationResult';
import { BlendCalculatorService } from '../../services/blendCalculator.service';
import { CalculatorDataService } from '../../services/calculator-data.service';

@Component({
    selector: 'calculator',
    templateUrl: './calculator.component.html',
    styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
    private blendCalculator: BlendCalculatorService;
    private calculatorDataService: CalculatorDataService;

    private imperialSubscription: Subscription;
    private measurePreasureSubscription: Subscription;
    private measureDistanceSubscription: Subscription;
    private requestSubscription: Subscription;

    imperialSelected: boolean;
    measurePreasure: string;
    measureDistance: string;
    result: CalculationResult;

    constructor(blendCalculator: BlendCalculatorService, calculatorDataService: CalculatorDataService) {
        this.blendCalculator = blendCalculator;
        this.calculatorDataService = calculatorDataService;
        this.systemSelectionChange(true);
    }

    ngOnInit() {
        this.imperialSubscription =
            this.calculatorDataService.imperialSelected.subscribe(value => this.imperialSelected = value);

        this.measurePreasureSubscription =
            this.calculatorDataService.measurePreasure.subscribe(value => this.measurePreasure = value);

        this.measureDistanceSubscription =
            this.calculatorDataService.measureDistance.subscribe(value => this.measureDistance = value);

        this.requestSubscription =
            this.calculatorDataService.requestObservable.subscribe(value => this.runCalculation(value));
    }

    ngOnDestroy() {
        this.imperialSubscription.unsubscribe();
        this.measurePreasureSubscription.unsubscribe();
        this.measureDistanceSubscription.unsubscribe();
        this.requestSubscription.unsubscribe();
    }

    systemSelectionChange(entry: boolean): void {
        this.calculatorDataService.updateSystemSelection(entry);
    }

    private runCalculation(request: CalculationRequest): void {
        this.result = this.blendCalculator.calculateFill(request);

        console.log('result: ', this.result);
    }
}