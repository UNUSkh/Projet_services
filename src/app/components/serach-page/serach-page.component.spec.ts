import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerachPageComponent } from './serach-page.component';

describe('SerachPageComponent', () => {
  let component: SerachPageComponent;
  let fixture: ComponentFixture<SerachPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SerachPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SerachPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
