import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFutbolTeam } from './edit-futbol-team';

describe('EditFutbolTeam', () => {
  let component: EditFutbolTeam;
  let fixture: ComponentFixture<EditFutbolTeam>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditFutbolTeam]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFutbolTeam);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
