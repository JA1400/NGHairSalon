import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourofourComponent } from './fourofour.component';

describe('FourofourComponent', () => {
  let component: FourofourComponent;
  let fixture: ComponentFixture<FourofourComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FourofourComponent]
    });
    fixture = TestBed.createComponent(FourofourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
