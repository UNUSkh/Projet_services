import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { NewsItem } from '../news-card/news-card.component';

@Component({
  selector: 'app-featured-news',
  templateUrl: './featured-news.component.html',
  styleUrls: ['./featured-news.component.css']
})
export class FeaturedNewsComponent implements OnInit {
  featuredNews: NewsItem[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.loadFeaturedNews();
  }

  loadFeaturedNews() {
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
}
