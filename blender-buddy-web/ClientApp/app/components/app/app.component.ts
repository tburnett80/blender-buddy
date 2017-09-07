import { Component } from '@angular/core';
import { CalculatorDataService } from '../../services/calculator-data.service';
import { BlendCalculatorService } from '../../services/blendCalculator.service';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [ CalculatorDataService, BlendCalculatorService ]
})
export class AppComponent {
}
