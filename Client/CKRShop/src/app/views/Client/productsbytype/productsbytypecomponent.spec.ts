import { iconSubset } from '../../../icons/icon-subset';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonModule, CardModule, FormModule, GridModule } from '@coreui/angular';
import { ProductsByTypeComponent } from '../productsbytype/productsbytype.component';
import { IconModule } from '@coreui/icons-angular';
import { IconSetService } from '@coreui/icons-angular';

describe('LoginComponent', () => {
    let component: ProductsByTypeComponent;
    let fixture: ComponentFixture<ProductsByTypeComponent>;
    let iconSetService: IconSetService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProductsByTypeComponent],
            imports: [FormModule, CardModule, GridModule, ButtonModule, IconModule],
            providers: [IconSetService]
        })
            .compileComponents();
    });

    beforeEach(() => {
        iconSetService = TestBed.inject(IconSetService);
        iconSetService.icons = { ...iconSubset };

        fixture = TestBed.createComponent(ProductsByTypeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
