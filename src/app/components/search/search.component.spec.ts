import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [FormsModule],
      providers: [
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle search visibility', () => {
    expect(component.isSearchVisible).toBeFalse();
    component.toggleSearch();
    expect(component.isSearchVisible).toBeTrue();
    component.toggleSearch();
    expect(component.isSearchVisible).toBeFalse();
  });

  it('should clear search query', () => {
    component.searchQuery = 'test query';
    component.clearSearch();
    expect(component.searchQuery).toBe('');
  });

  it('should navigate when search is performed with valid query', () => {
    component.searchQuery = 'test search';
    component.search();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/search'], { queryParams: { q: 'test search' } });
    expect(component.searchQuery).toBe('');
    expect(component.isSearchVisible).toBeFalse();
  });

  it('should not navigate when search is performed with empty query', () => {
    component.searchQuery = '   ';
    component.search();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});
