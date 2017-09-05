import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { MeasureModeService } from '../../services/measure-system.service';

@Component({
    selector: 'tank',
    templateUrl: './Tank.component.html'
})
export class TankComponent {
    measureModeService: MeasureModeService;
    imperialSubscription: Subscription;
    measurePreasureSubscription: Subscription;
    measureDistanceSubscription: Subscription;

    imperialSelected: boolean;
    measurePreasure: string;
    measureDistance: string;

    heliumPercent: number;
    oxygenPercent: number;
    nitrogenPercent: number;

    constructor(measureModeService: MeasureModeService) {
        this.measureModeService = measureModeService;
        this.heliumPercent = 0;
        this.oxygenPercent = 21;
        this.nitrogenPercent = 79;
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

    private updatePercents(): void {
        if (this.oxygenPercent > 100)
            this.oxygenPercent = 100;

        if (this.oxygenPercent + this.heliumPercent > 100)
            this.heliumPercent = 100 - this.oxygenPercent;

        this.nitrogenPercent = 100 - (this.oxygenPercent + this.heliumPercent);
    }
}