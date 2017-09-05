import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MeasureModeService } from '../../services/measure-system.service';
import { TankInfo } from '../../models/calculator/tankinfo';

@Component({
    selector: 'tank',
    templateUrl: './Tank.component.html'
})
export class TankComponent {
    measureModeService: MeasureModeService;
    measurePreasureSubscription: Subscription;
    measureDistanceSubscription: Subscription;

    measurePreasure: string;
    measureDistance: string;

    @Input() tankPreasure: number;
    tank: TankInfo;

    constructor(measureModeService: MeasureModeService) {
        this.measureModeService = measureModeService;

        this.tank = new TankInfo();
        
        this.tank.gasBlend.helium = 0;
        this.tank.gasBlend.oxygen = 21;
        this.tank.gasBlend.nitrogen = 79;
    }

    ngOnInit() {
        this.measurePreasureSubscription =
            this.measureModeService.measurePreasure.subscribe(value => this.measurePreasure = value);

        this.measureDistanceSubscription =
            this.measureModeService.measureDistance.subscribe(value => this.measureDistance = value);

        if(this.tank.pressure < 0)
            this.tank.pressure = this.tankPreasure;
    }

    ngOnDestroy() {
        this.measurePreasureSubscription.unsubscribe();
        this.measureDistanceSubscription.unsubscribe();
    }

    private updatePercents(): void {
        if (this.tank.gasBlend.oxygen > 100)
            this.tank.gasBlend.oxygen = 100;

        if ((this.tank.gasBlend.oxygen + this.tank.gasBlend.helium) > 100)
            this.tank.gasBlend.helium = 100 - this.tank.gasBlend.oxygen;

        this.tank.gasBlend.nitrogen = 100 - (this.tank.gasBlend.oxygen + this.tank.gasBlend.helium);
    }
}