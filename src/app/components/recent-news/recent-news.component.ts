import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { NewsItem } from '../news-card/news-card.component';
import { ActivatedRoute } from '@angular/router';

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
    category: string = 'general';

    constructor(private newsService: NewsService,private route: ActivatedRoute) {}

    ngOnInit(): void {
      this.loadFeaturedNews();

      this.route.queryParams.subscribe(params => {
        this.category = params['category'] || 'general';
        this.fetchBreakingNews();
      });
    }

    setActiveTab(tab: string) {
      this.activeTab = tab;
    }

    fetchBreakingNews(): void {
      this.newsService.getNews(this.category).subscribe(response => {
        this.featuredNews = response.data;
        this.newsService.updateNews(this.featuredNews);

        if (response && response.data) {
          this.featuredNews = response.data;
        } else {
          this.errorMessage = 'Aucune actualité à afficher';
        }
        this.isLoading = false;
      });
    }
    loadFeaturedNews(): void {
        this.isLoading = true;
    }
}
