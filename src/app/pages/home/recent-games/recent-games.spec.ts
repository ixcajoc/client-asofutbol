import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentGames } from './recent-games';

describe('RecentGames', () => {
  let component: RecentGames;
  let fixture: ComponentFixture<RecentGames>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentGames]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentGames);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
