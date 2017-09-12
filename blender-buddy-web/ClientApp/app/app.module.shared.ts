import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { GasComponent } from './components/gas/gas.component';
import { TankComponent } from './components/tank/tank.component';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { MixPickerComponent } from './components/mixpicker/mixpicker.component';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        GasComponent,
        TankComponent,
        CalculatorComponent,
        MixPickerComponent,
        HomeComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'calculator', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'calculator', component: CalculatorComponent },
            { path: 'mix-picker', component: MixPickerComponent },
            { path: '**', redirectTo: 'calculator' }
        ])
    ]
})
export class AppModuleShared {
}
