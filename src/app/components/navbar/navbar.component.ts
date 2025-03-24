import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  navItems = [
    { label: 'Accueil', link: '/', category: 'general', active: true },
    { label: 'Business', link: '/news/business', category: 'business' },
    { label: 'Divertissement', link: '/news/entertainment', category: 'entertainment' },
    { label: 'Santé', link: '/news/health', category: 'health' },
    { label: 'Science', link: '/news/science', category: 'science' },
    { label: 'Sport', link: '/news/sports', category: 'sports' },
    { label: 'Technologies', link: '/news/technology', category: 'technology' }
  ];

  isSearchVisible = false;
  searchQuery: string = '';
  isLoggedIn: boolean = false;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe(user => {
      this.isLoggedIn = !user;
    });
  }

  toggleSearch() {
    this.isSearchVisible = !this.isSearchVisible;
  }

  search() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], { queryParams: { q: this.searchQuery } });
      this.searchQuery = '';
      this.isSearchVisible = false;
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  navigateToCategory(category: string) {
    this.navItems.forEach(item => item.active = false);
    const activeItem = this.navItems.find(item => item.category === category);
    if (activeItem) {
      activeItem.active = true;
    }
    this.router.navigate([], {
      queryParams: { category: category },
      queryParamsHandling: 'merge',
    });
  }

  onSearchClosed() {
  }
}
