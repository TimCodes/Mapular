import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleesrimapComponent } from './simpleesrimap.component';

describe('SimpleesrimapComponent', () => {
  let component: SimpleesrimapComponent;
  let fixture: ComponentFixture<SimpleesrimapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleesrimapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleesrimapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
