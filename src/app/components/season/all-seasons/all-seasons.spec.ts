import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSeasons } from './all-seasons';

describe('AllSeasons', () => {
  let component: AllSeasons;
  let fixture: ComponentFixture<AllSeasons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllSeasons]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllSeasons);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
