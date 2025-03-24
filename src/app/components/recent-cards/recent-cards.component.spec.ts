import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentCardsComponent } from './recent-cards.component';

describe('RecentCardsComponent', () => {
  let component: RecentCardsComponent;
  let fixture: ComponentFixture<RecentCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecentCardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecentCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
