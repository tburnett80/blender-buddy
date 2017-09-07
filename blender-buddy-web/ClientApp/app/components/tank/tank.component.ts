import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { CalculatorDataService } from '../../services/calculator-data.service';
import { TankInfo } from '../../models/calculator/tankInfo';

@Component({
    selector: 'tank',
    templateUrl: './tank.component.html'
})
export class TankComponent {
    private calculatorDataService: CalculatorDataService;
    private imperialSubscription: Subscription;
    private measurePreasureSubscription: Subscription;
    private measureDistanceSubscription: Subscription;

    imperialSelected: boolean;
    measurePreasure: string;
    measureDistance: string;
    tank: TankInfo;

    @Input() isResidual: boolean;
    
    constructor(calculatorDataService: CalculatorDataService) {
        this.calculatorDataService = calculatorDataService;

        this.tank = new TankInfo();

        this.tank.gasBlend.helium = 0;
        this.tank.gasBlend.oxygen = 21;
        this.tank.gasBlend.nitrogen = 79;
    }

    ngOnInit() {
        this.imperialSubscription =
            this.calculatorDataService.imperialSelected.subscribe(value => this.imperialSelected = value);

        this.measurePreasureSubscription =
            this.calculatorDataService.measurePreasure.subscribe(value => this.measurePreasure = value);

        this.measureDistanceSubscription =
            this.calculatorDataService.measureDistance.subscribe(value => this.measureDistance = value);

        if (this.isResidual) {
            if (this.tank.pressure === -1)
                this.tank.pressure = 500; 
        } else {
            if (this.tank.pressure === -1)
                this.tank.pressure = 3000; 
        }

        this.updatePercents();
    }

    ngOnDestroy() {
        this.imperialSubscription.unsubscribe();
        this.measurePreasureSubscription.unsubscribe();
        this.measureDistanceSubscription.unsubscribe();
    }

    updatePercents(): void {
        if (this.tank.gasBlend.oxygen > 100)
            this.tank.gasBlend.oxygen = 100;

        if ((this.tank.gasBlend.oxygen + this.tank.gasBlend.helium) > 100)
            this.tank.gasBlend.helium = 100 - this.tank.gasBlend.oxygen;

        this.tank.gasBlend.nitrogen = 100 - (this.tank.gasBlend.oxygen + this.tank.gasBlend.helium);

        if (this.isResidual) {
            this.calculatorDataService.updateResidual(this.tank);
        } else {
            this.calculatorDataService.updateDesiredFill(this.tank);
        }
    }
}