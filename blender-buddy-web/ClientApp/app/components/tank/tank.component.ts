import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { CalculatorDataService } from '../../services/calculator-data.service';
import { TankInfo } from '../../models/calculator/tankInfo';

@Component({
    selector: 'tank',
    templateUrl: './tank.component.html',
    styleUrls: ['./tank.component.css']

})
export class TankComponent {
    private readonly calculatorDataService: CalculatorDataService;
    private measurePreasureSubscription: Subscription;

    measurePreasure: string;
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
        this.measurePreasureSubscription =
            this.calculatorDataService.measurePreasure.subscribe(value => this.measurePreasure = value);

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
        this.measurePreasureSubscription.unsubscribe();
    }

    updatePercents(): void {
        if (this.tank.gasBlend.oxygen < 0)
            this.tank.gasBlend.oxygen = 0;

        if (this.tank.gasBlend.nitrogen < 0)
            this.tank.gasBlend.nitrogen = 0;

        if (this.tank.gasBlend.helium < 0)
            this.tank.gasBlend.helium = 0;

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