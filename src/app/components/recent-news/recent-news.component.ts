import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { NewsItem } from '../news-card/news-card.component';

@Component({
  selector: 'app-recent-news',
  templateUrl: './recent-news.component.html',
  styleUrl: './recent-news.component.css'
})
export class RecentNewsComponent implements OnInit{
  featuredNews: NewsItem[] = [];
    isLoading: boolean = true;
    errorMessage: string = '';
    activeTab: string = 'recent';

    constructor(private newsService: NewsService) {}
  
    ngOnInit() {
      this.loadFeaturedNews();
    }

    setActiveTab(tab: string) {
      this.activeTab = tab;
    }
  
    loadFeaturedNews() {
      this.isLoading = true;
    
      
    this.newsService.getNews('general', 'fr', 'fr', 12).subscribe(
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
}}
