import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecouvCardsComponent } from './decouv-cards.component';

describe('DecouvCardsComponent', () => {
  let component: DecouvCardsComponent;
  let fixture: ComponentFixture<DecouvCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DecouvCardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DecouvCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
