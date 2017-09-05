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

    constructor(measureModeService: MeasureModeService) {
        this.measureModeService = measureModeService;
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
}