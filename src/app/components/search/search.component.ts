import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  @Output() searchClosed = new EventEmitter<void>();
  isSearchVisible = false;
  searchQuery: string = '';

  constructor(private router: Router) {}

  toggleSearch() {
    this.isSearchVisible = !this.isSearchVisible;
    if (!this.isSearchVisible) {
      this.searchClosed.emit();
    }
  }

  search() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], { queryParams: { q: this.searchQuery } });
      this.searchQuery = '';
      this.isSearchVisible = false;
      this.searchClosed.emit();
    }
  }

  clearSearch() {
    this.searchQuery = '';
  }
}
