import { Component } from '@angular/core';
import { MeasureModeService } from '../../services/measure-system.service';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [ MeasureModeService ]
})
export class AppComponent {
}
