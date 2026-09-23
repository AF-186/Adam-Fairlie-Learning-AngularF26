import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FishListItem } from './fish-list-item';

describe('FishListItem', () => {
  let component: FishListItem;
  let fixture: ComponentFixture<FishListItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FishListItem],
    }).compileComponents();

    fixture = TestBed.createComponent(FishListItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
