import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentNewsComponent } from './recent-news.component';

describe('RecentNewsComponent', () => {
  let component: RecentNewsComponent;
  let fixture: ComponentFixture<RecentNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecentNewsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecentNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
