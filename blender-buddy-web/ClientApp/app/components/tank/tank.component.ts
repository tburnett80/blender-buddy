import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { CalculatorDataService } from '../../services/calculator-data.service';
import { TankInfo } from '../../models/calculator/tankInfo';
import { Gas } from '../../models/calculator/gas';

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
    }

    ngOnDestroy() {
        this.measurePreasureSubscription.unsubscribe();
    }

    updateTank(gas?: Gas): void {
        if(gas)
            this.tank.gasBlend = gas;

        if (this.isResidual) {
            this.calculatorDataService.updateResidual(this.tank);
        } else {
            this.calculatorDataService.updateDesiredFill(this.tank);
        }
    }
}