import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FishForm } from './fish-form';

describe('FishForm', () => {
  let component: FishForm;
  let fixture: ComponentFixture<FishForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FishForm],
    }).compileComponents();

    fixture = TestBed.createComponent(FishForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
