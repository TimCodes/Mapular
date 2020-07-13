import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeafletmapComponent } from './leafletmap.component';

describe('LeafletmapComponent', () => {
  let component: LeafletmapComponent;
  let fixture: ComponentFixture<LeafletmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeafletmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeafletmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
