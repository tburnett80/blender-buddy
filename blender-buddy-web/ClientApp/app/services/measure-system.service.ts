import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class MeasureModeService {
    private imperialSource = new BehaviorSubject<boolean>(true);
    private measurePreasureSource = new BehaviorSubject<string>('psi');
    private measureDistanceSource = new BehaviorSubject<string>('feet');

    imperialSelected = this.imperialSource.asObservable();
    measurePreasure = this.measurePreasureSource.asObservable();
    measureDistance = this.measureDistanceSource.asObservable();

    constructor() {
        this.updateSystemSelection(true);
    }

    public updateSystemSelection(entry: boolean): void {
        this.imperialSource.next(entry);
        this.measurePreasureSource.next(entry ? 'psi' : 'bar');
        this.measureDistanceSource.next(entry ? 'feet' : 'meters');
    }
}