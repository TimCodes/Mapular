import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturelayeresriComponent } from './featurelayeresri.component';

describe('FeaturelayeresriComponent', () => {
  let component: FeaturelayeresriComponent;
  let fixture: ComponentFixture<FeaturelayeresriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturelayeresriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturelayeresriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
