import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseEntranceComponent } from './warehouse-entrance.component';

describe('WarehouseEntranceComponent', () => {
  let component: WarehouseEntranceComponent;
  let fixture: ComponentFixture<WarehouseEntranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseEntranceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseEntranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
