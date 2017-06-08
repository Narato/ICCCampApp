import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLeisureActivitiesComponent } from './my-leisure-activities.component';

describe('MyLeisureActivitiesComponent', () => {
  let component: MyLeisureActivitiesComponent;
  let fixture: ComponentFixture<MyLeisureActivitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyLeisureActivitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyLeisureActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
