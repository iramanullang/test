import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsalesmanComponent } from './detailsalesman.component';

describe('DetailsalesmanComponent', () => {
  let component: DetailsalesmanComponent;
  let fixture: ComponentFixture<DetailsalesmanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsalesmanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsalesmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
