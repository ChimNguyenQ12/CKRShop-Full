import { iconSubset } from './../../../icons/icon-subset';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonModule, CardModule, FormModule, GridModule } from '@coreui/angular';
import { IndexComponent } from './index.component';
import { IconModule } from '@coreui/icons-angular';
import { IconSetService } from '@coreui/icons-angular';

describe('LoginComponent', () => {
    let component: IndexComponent;
    let fixture: ComponentFixture<IndexComponent>;
    let iconSetService: IconSetService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [IndexComponent],
            imports: [FormModule, CardModule, GridModule, ButtonModule, IconModule],
            providers: [IconSetService]
        })
            .compileComponents();
    });

    beforeEach(() => {
        iconSetService = TestBed.inject(IconSetService);
        iconSetService.icons = { ...iconSubset };

        fixture = TestBed.createComponent(IndexComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
