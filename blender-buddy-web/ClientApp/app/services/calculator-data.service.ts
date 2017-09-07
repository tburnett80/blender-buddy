import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from "rxjs/Observable";
import { Subscription } from 'rxjs/Subscription';
import { MeasureMode } from '../models/calculator/measureMode';
import { CalculationRequest } from '../models/calculator/calculationRequest';
import { TankInfo } from '../models/calculator/tankInfo';

@Injectable()
export class CalculatorDataService {
    private imperialSource = new BehaviorSubject<boolean>(true);
    private measurePreasureSource = new BehaviorSubject<string>(' ');
    private measureDistanceSource = new BehaviorSubject<string>(' ');
    private calculationRequestSource = new BehaviorSubject<CalculationRequest>(new CalculationRequest());

    private request: CalculationRequest;
    private requestSubScription: Subscription;

    imperialSelected = this.imperialSource.asObservable();
    measurePreasure = this.measurePreasureSource.asObservable();
    measureDistance = this.measureDistanceSource.asObservable();
    requestObservable = this.calculationRequestSource.asObservable();

    constructor() {
        this.requestSubScription = this.requestObservable.subscribe(value => this.request = value);

        //initialize imperial
        this.updateSystemSelection(true);
    }

    public updateSystemSelection(isImperial: boolean): void {
        this.imperialSource.next(isImperial);
        this.measurePreasureSource.next(isImperial ? 'psi' : 'bar');
        this.measureDistanceSource.next(isImperial ? 'feet' : 'meters');

        this.request.system = isImperial ? MeasureMode.Imperial : MeasureMode.Metric;
        this.calculationRequestSource.next(this.request);
    }

    public updateDesiredFill(tank: TankInfo): void {
        this.request.fillSpecs = tank;
        this.calculationRequestSource.next(this.request);
    }

    public updateResidual(tank: TankInfo): void {
        this.request.residual = tank;
        this.calculationRequestSource.next(this.request);
    }

    public updateRequest(request: CalculationRequest): void {
        this.calculationRequestSource.next(request);
    }
}