import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFutbolPlayer } from './edit-futbol-player';

describe('EditFutbolPlayer', () => {
  let component: EditFutbolPlayer;
  let fixture: ComponentFixture<EditFutbolPlayer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditFutbolPlayer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFutbolPlayer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
