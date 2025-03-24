import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecouvrezNewsComponent } from './decouvrez-news.component';

describe('DecouvrezNewsComponent', () => {
  let component: DecouvrezNewsComponent;
  let fixture: ComponentFixture<DecouvrezNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DecouvrezNewsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DecouvrezNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
