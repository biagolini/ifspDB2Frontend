import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseExitComponent } from './warehouse-exit.component';

describe('WarehouseExitComponent', () => {
  let component: WarehouseExitComponent;
  let fixture: ComponentFixture<WarehouseExitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseExitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseExitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
