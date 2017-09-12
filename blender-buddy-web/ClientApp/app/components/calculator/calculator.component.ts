import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { CalculationRequest } from '../../models/calculator/calculationRequest';
import { CalculationResult } from '../../models/calculator/calculationResult';
import { BlendCalculatorService } from '../../services/blendCalculator.service';
import { CalculatorDataService } from '../../services/calculator-data.service';
import { Gas } from '../../models/calculator/gas';
import { TopOffGas } from '../../models/calculator/topOffGas';

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
    topOffs: any;
    selectedGas: number;
    selectedGasText: string;

    constructor(blendCalculator: BlendCalculatorService, calculatorDataService: CalculatorDataService) {
        this.blendCalculator = blendCalculator;
        this.calculatorDataService = calculatorDataService;
        this.systemSelectionChange(true);
        this.topOffs = this.enumSelector(TopOffGas);
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

        this.selectedGasText = TopOffGas[0];
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

    updateFillGas(gas?: Gas): void {
        if (!gas)
            gas = new Gas();
        this.selectedGasText = TopOffGas[this.selectedGas];
        this.calculatorDataService.updateTopOffGas(this.selectedGas, gas);
    }

    updateFillGasSelection(): void {
        this.selectedGasText = TopOffGas[this.selectedGas];
        this.calculatorDataService.updateTopOffGas(this.selectedGas, new Gas());
    }

    private runCalculation(request: CalculationRequest): void {
        this.result = this.blendCalculator.calculateFill(request);
    }

    private enumSelector(definition: any): any {
        return Object.keys(definition)
            .filter(key => isNaN(+key))
            .map(key => ({ value: definition[key], title: key }));
    }
}