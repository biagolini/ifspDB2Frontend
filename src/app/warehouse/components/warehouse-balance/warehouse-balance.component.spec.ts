import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseBalanceComponent } from './warehouse-balance.component';

describe('WarehouseBalanceComponent', () => {
  let component: WarehouseBalanceComponent;
  let fixture: ComponentFixture<WarehouseBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseBalanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
