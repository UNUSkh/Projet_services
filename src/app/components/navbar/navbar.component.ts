import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NewsService } from '../../services/news.service';

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
  searchResults: any[] = [];
  
  isLoading = true;
  featuredNews: any[] = [];
  errorMessage: string | null = null;




  constructor(private router: Router, private authService: AuthService, private newsService: NewsService) { }

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe(user => {
      this.isLoggedIn = !user;
    });
    this.loadNews()
  }

  toggleSearch() {
    this.isSearchVisible = !this.isSearchVisible;
  }
  loadNews() {
    this.isLoading = true;
    this.newsService.getNews('general', 'fr', 'fr', 4).subscribe(
      (response) => {
        if (response && response.data) {
          this.featuredNews = response.data;
        } else {
          this.errorMessage = 'Aucune actualité à afficher';
        }
        this.isLoading = false;
      },
      (error) => {
        console.error('Erreur lors du chargement des actualités:', error);
        this.errorMessage = 'Erreur lors du chargement des actualités';
        this.isLoading = false;
      }
    );
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
  filterResults(query: string) {
    if (!query) return [];
    return this.featuredNews.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()) || 
      item.description.toLowerCase().includes(query.toLowerCase())
    );
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
  performSearch() {
    console.log('Searching for:', this.searchQuery);
    this.searchResults = this.filterResults(this.searchQuery);
  }
  onSearchClosed() {
  }
}