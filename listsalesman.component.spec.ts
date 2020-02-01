import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsalesmanComponent } from './listsalesman.component';

describe('ListsalesmanComponent', () => {
  let component: ListsalesmanComponent;
  let fixture: ComponentFixture<ListsalesmanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListsalesmanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsalesmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
