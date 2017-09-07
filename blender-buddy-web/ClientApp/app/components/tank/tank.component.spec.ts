/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { FormsModule } from '@angular/forms';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TankComponent } from './tank.component';
import { CalculatorDataService } from '../../services/calculator-data.service';

describe('Component: TankComponent', () => {
    let component: TankComponent;
    let fixture: ComponentFixture<TankComponent>;
    let element: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TankComponent],
            imports: [ FormsModule ],
            providers: [CalculatorDataService]
        }).compileComponents();

        fixture = TestBed.createComponent(TankComponent);
        component = fixture.componentInstance;
        component.isResidual = false;
        component.ngOnInit();

        element = fixture.nativeElement;
        fixture.detectChanges();
    });

    afterEach(() => {
        component.ngOnDestroy();
    });

    it('should be defined', () => {
        expect(component).toBeDefined();
    });

    it('should have valid default values', () => {
        expect(component.tank.pressure).toEqual(3000);
        expect(component.measurePreasure).toEqual('psi');
        expect(component.tank.gasBlend.helium).toEqual(0);
        expect(component.tank.gasBlend.oxygen).toEqual(21);
        expect(component.tank.gasBlend.nitrogen).toEqual(79);

        expect((element.querySelector('.o2-bar') as HTMLElement).getAttribute('style')).toBe('width: 21%;');
        expect((element.querySelector('.he-bar') as HTMLElement).getAttribute('style')).toBe('width: 0%;');
        expect((element.querySelector('.n2-bar') as HTMLElement).getAttribute('style')).toBe('width: 79%;');
    });

    it('should have valid default values for residual', () => {
        //reset to default values, then run ngOnInit
        component.isResidual = true;
        component.tank.pressure = -1;
        component.ngOnInit();

        expect(component.tank.pressure).toEqual(500);
        expect(component.measurePreasure).toEqual('psi');
        expect(component.tank.gasBlend.helium).toEqual(0);
        expect(component.tank.gasBlend.oxygen).toEqual(21);
        expect(component.tank.gasBlend.nitrogen).toEqual(79);

        expect((element.querySelector('.o2-bar') as HTMLElement).getAttribute('style')).toBe('width: 21%;');
        expect((element.querySelector('.he-bar') as HTMLElement).getAttribute('style')).toBe('width: 0%;');
        expect((element.querySelector('.n2-bar') as HTMLElement).getAttribute('style')).toBe('width: 79%;');
    });

    it('user input should trigger graph and model updates', () => {
        expect(component.tank.pressure).toEqual(3000);
        expect(component.measurePreasure).toEqual('psi');
        expect(component.tank.gasBlend.helium).toEqual(0);
        expect(component.tank.gasBlend.oxygen).toEqual(21);
        expect(component.tank.gasBlend.nitrogen).toEqual(79);

        expect((element.querySelector('.o2-bar') as HTMLElement).getAttribute('style')).toBe('width: 21%;');
        expect((element.querySelector('.he-bar') as HTMLElement).getAttribute('style')).toBe('width: 0%;');
        expect((element.querySelector('.n2-bar') as HTMLElement).getAttribute('style')).toBe('width: 79%;');

        //update the oxygen content
        let field: HTMLInputElement = fixture.debugElement.query(By.css('.o2-npt')).nativeElement;
        field.value = '36';
        field.dispatchEvent(new Event('input'));
        field.dispatchEvent(new Event('change'));
        fixture.detectChanges();

        //validate changes are reflected in model and tank graph
        expect(component.tank.gasBlend.helium).toEqual(0);
        expect(component.tank.gasBlend.oxygen).toEqual(36);
        expect(component.tank.gasBlend.nitrogen).toEqual(64);

        expect((element.querySelector('.o2-bar') as HTMLElement).getAttribute('style')).toBe('width: 36%;');
        expect((element.querySelector('.he-bar') as HTMLElement).getAttribute('style')).toBe('width: 0%;');
        expect((element.querySelector('.n2-bar') as HTMLElement).getAttribute('style')).toBe('width: 64%;');
    });

    it('should update percent calculations when tank preasure is updated', () => {
        expect(component.tank.pressure).toEqual(3000);
        expect(component.measurePreasure).toEqual('psi');
        expect(component.tank.gasBlend.helium).toEqual(0);
        expect(component.tank.gasBlend.oxygen).toEqual(21);
        expect(component.tank.gasBlend.nitrogen).toEqual(79);

        expect((element.querySelector('.o2-bar') as HTMLElement).getAttribute('style')).toBe('width: 21%;');
        expect((element.querySelector('.he-bar') as HTMLElement).getAttribute('style')).toBe('width: 0%;');
        expect((element.querySelector('.n2-bar') as HTMLElement).getAttribute('style')).toBe('width: 79%;');

        let tank: HTMLInputElement = fixture.debugElement.query(By.css('.tnk-npt')).nativeElement;
        tank.value = '2500';
        component.tank.gasBlend.oxygen = 25;
        tank.dispatchEvent(new Event('input'));
        tank.dispatchEvent(new Event('change'));
        fixture.detectChanges();

        //validate gas percents are updated when tank is updated
        expect(component.tank.gasBlend.helium).toEqual(0);
        expect(component.tank.gasBlend.oxygen).toEqual(25);
        expect(component.tank.gasBlend.nitrogen).toEqual(75);

        expect((element.querySelector('.o2-bar') as HTMLElement).getAttribute('style')).toBe('width: 25%;');
        expect((element.querySelector('.he-bar') as HTMLElement).getAttribute('style')).toBe('width: 0%;');
        expect((element.querySelector('.n2-bar') as HTMLElement).getAttribute('style')).toBe('width: 75%;');
    });

    it('should correct invalid oxygen percents over 100', () => {
        expect(component.tank.pressure).toEqual(3000);
        expect(component.measurePreasure).toEqual('psi');
        expect(component.tank.gasBlend.helium).toEqual(0);
        expect(component.tank.gasBlend.oxygen).toEqual(21);
        expect(component.tank.gasBlend.nitrogen).toEqual(79);

        expect((element.querySelector('.o2-bar') as HTMLElement).getAttribute('style')).toBe('width: 21%;');
        expect((element.querySelector('.he-bar') as HTMLElement).getAttribute('style')).toBe('width: 0%;');
        expect((element.querySelector('.n2-bar') as HTMLElement).getAttribute('style')).toBe('width: 79%;');

        //update the oxygen content
        let field: HTMLInputElement = fixture.debugElement.query(By.css('.o2-npt')).nativeElement;
        field.value = '1665406';
        field.dispatchEvent(new Event('input'));
        field.dispatchEvent(new Event('change'));
        fixture.detectChanges();

        //validate changes are reflected in model and tank graph
        expect(component.tank.gasBlend.helium).toEqual(0);
        expect(component.tank.gasBlend.oxygen).toEqual(100);
        expect(component.tank.gasBlend.nitrogen).toEqual(0);

        expect((element.querySelector('.o2-bar') as HTMLElement).getAttribute('style')).toBe('width: 100%;');
        expect((element.querySelector('.he-bar') as HTMLElement).getAttribute('style')).toBe('width: 0%;');
        expect((element.querySelector('.n2-bar') as HTMLElement).getAttribute('style')).toBe('width: 0%;');
    });

    it('should correct oxygen percents and adjust helium', () => {
        expect(component.tank.pressure).toEqual(3000);
        expect(component.measurePreasure).toEqual('psi');
        expect(component.tank.gasBlend.helium).toEqual(0);
        expect(component.tank.gasBlend.oxygen).toEqual(21);
        expect(component.tank.gasBlend.nitrogen).toEqual(79);

        expect((element.querySelector('.o2-bar') as HTMLElement).getAttribute('style')).toBe('width: 21%;');
        expect((element.querySelector('.he-bar') as HTMLElement).getAttribute('style')).toBe('width: 0%;');
        expect((element.querySelector('.n2-bar') as HTMLElement).getAttribute('style')).toBe('width: 79%;');

        //update the oxygen content
        let oxygenField: HTMLInputElement = fixture.debugElement.query(By.css('.o2-npt')).nativeElement;
        let heliumField: HTMLInputElement = fixture.debugElement.query(By.css('.he-npt')).nativeElement;
        oxygenField.value = '1665406';
        heliumField.value = '25';
        oxygenField.dispatchEvent(new Event('input'));
        heliumField.dispatchEvent(new Event('input'));
        heliumField.dispatchEvent(new Event('change'));
        oxygenField.dispatchEvent(new Event('change'));
        fixture.detectChanges();

        //validate changes are reflected in model and tank graph
        expect(component.tank.gasBlend.helium).toEqual(0);
        expect(component.tank.gasBlend.oxygen).toEqual(100);
        expect(component.tank.gasBlend.nitrogen).toEqual(0);

        expect((element.querySelector('.o2-bar') as HTMLElement).getAttribute('style')).toBe('width: 100%;');
        expect((element.querySelector('.he-bar') as HTMLElement).getAttribute('style')).toBe('width: 0%;');
        expect((element.querySelector('.n2-bar') as HTMLElement).getAttribute('style')).toBe('width: 0%;');

        //adjust helium again
        oxygenField.value = '60';
        heliumField.value = '57';
        oxygenField.dispatchEvent(new Event('input'));
        heliumField.dispatchEvent(new Event('input'));
        heliumField.dispatchEvent(new Event('change'));
        oxygenField.dispatchEvent(new Event('change'));
        fixture.detectChanges();

        //validate changes are reflected in model and tank graph
        expect(component.tank.gasBlend.helium).toEqual(40);
        expect(component.tank.gasBlend.oxygen).toEqual(60);
        expect(component.tank.gasBlend.nitrogen).toEqual(0);

        expect((element.querySelector('.o2-bar') as HTMLElement).getAttribute('style')).toBe('width: 60%;');
        expect((element.querySelector('.he-bar') as HTMLElement).getAttribute('style')).toBe('width: 40%;');
        expect((element.querySelector('.n2-bar') as HTMLElement).getAttribute('style')).toBe('width: 0%;');

        //adjust final time
        oxygenField.value = '35';
        heliumField.value = '35';
        oxygenField.dispatchEvent(new Event('input'));
        heliumField.dispatchEvent(new Event('input'));
        heliumField.dispatchEvent(new Event('change'));
        oxygenField.dispatchEvent(new Event('change'));
        fixture.detectChanges();

        //validate changes are reflected in model and tank graph
        expect(component.tank.gasBlend.helium).toEqual(35);
        expect(component.tank.gasBlend.oxygen).toEqual(35);
        expect(component.tank.gasBlend.nitrogen).toEqual(30);

        expect((element.querySelector('.o2-bar') as HTMLElement).getAttribute('style')).toBe('width: 35%;');
        expect((element.querySelector('.he-bar') as HTMLElement).getAttribute('style')).toBe('width: 35%;');
        expect((element.querySelector('.n2-bar') as HTMLElement).getAttribute('style')).toBe('width: 30%;');
    });

    it('should corerct invalid gas percents', () => {
        expect(component.tank.pressure).toEqual(3000);
        expect(component.measurePreasure).toEqual('psi');
        expect(component.tank.gasBlend.helium).toEqual(0);
        expect(component.tank.gasBlend.oxygen).toEqual(21);
        expect(component.tank.gasBlend.nitrogen).toEqual(79);

        expect((element.querySelector('.o2-bar') as HTMLElement).getAttribute('style')).toBe('width: 21%;');
        expect((element.querySelector('.he-bar') as HTMLElement).getAttribute('style')).toBe('width: 0%;');
        expect((element.querySelector('.n2-bar') as HTMLElement).getAttribute('style')).toBe('width: 79%;');

        //update the oxygen content
        let oxygenField: HTMLInputElement = fixture.debugElement.query(By.css('.o2-npt')).nativeElement;
        let heliumField: HTMLInputElement = fixture.debugElement.query(By.css('.he-npt')).nativeElement;
        let nitrogenField: HTMLInputElement = fixture.debugElement.query(By.css('.n2-npt')).nativeElement;
        oxygenField.value = '1665406';
        heliumField.value = '205';
        nitrogenField.value = '151321';

        oxygenField.dispatchEvent(new Event('input'));
        heliumField.dispatchEvent(new Event('input'));
        nitrogenField.dispatchEvent(new Event('input'));
        nitrogenField.dispatchEvent(new Event('change'));
        fixture.detectChanges();

        //validate changes are reflected in model and tank graph
        expect(component.tank.gasBlend.helium).toEqual(0);
        expect(component.tank.gasBlend.oxygen).toEqual(100);
        expect(component.tank.gasBlend.nitrogen).toEqual(0);

        expect((element.querySelector('.o2-bar') as HTMLElement).getAttribute('style')).toBe('width: 100%;');
        expect((element.querySelector('.he-bar') as HTMLElement).getAttribute('style')).toBe('width: 0%;');
        expect((element.querySelector('.n2-bar') as HTMLElement).getAttribute('style')).toBe('width: 0%;');

        //adjust again, nitrogen bar will fill up since there is no oxygen or helium.
        oxygenField.value = '-12';
        heliumField.value = '-65451';
        nitrogenField.value = '-1';

        oxygenField.dispatchEvent(new Event('input'));
        heliumField.dispatchEvent(new Event('input'));
        nitrogenField.dispatchEvent(new Event('input'));
        nitrogenField.dispatchEvent(new Event('change'));
        fixture.detectChanges();

        //validate changes are reflected in model and tank graph
        expect(component.tank.gasBlend.helium).toEqual(0);
        expect(component.tank.gasBlend.oxygen).toEqual(0);
        expect(component.tank.gasBlend.nitrogen).toEqual(100);

        expect((element.querySelector('.o2-bar') as HTMLElement).getAttribute('style')).toBe('width: 0%;');
        expect((element.querySelector('.he-bar') as HTMLElement).getAttribute('style')).toBe('width: 0%;');
        expect((element.querySelector('.n2-bar') as HTMLElement).getAttribute('style')).toBe('width: 100%;');
    });
});