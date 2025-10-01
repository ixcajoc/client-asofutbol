import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveSeason } from './active-season';

describe('ActiveSeason', () => {
  let component: ActiveSeason;
  let fixture: ComponentFixture<ActiveSeason>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveSeason]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveSeason);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
