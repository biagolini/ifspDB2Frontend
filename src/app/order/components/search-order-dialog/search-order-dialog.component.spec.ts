import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchOrderDialogComponent } from './search-order-dialog.component';

describe('SearchOrderDialogComponent', () => {
  let component: SearchOrderDialogComponent;
  let fixture: ComponentFixture<SearchOrderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchOrderDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchOrderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
