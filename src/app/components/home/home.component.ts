import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { GeolocationService } from '../../services/geolocation.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
    newsData: any[] = [];
    today: Date = new Date();
    location: string = 'Chargement de la localisation...';
    randomNews: string = 'Chargement des actualités...';
    category: string = 'general';
  constructor(
    private NewsService: NewsService,
    private geolocationService: GeolocationService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.fetchBreakingNews();

    this.geolocationService.location$.subscribe(loc => {
      if (loc) {
        this.location = loc.location;
      } else {
        this.location = 'Localisation non disponible';
      }
    });

    this.route.queryParams.subscribe(params => {
      this.category = params['category'] || 'general';
      this.fetchBreakingNews();
    });

    this.NewsService.getNews(this.category).subscribe(data => {
      this.newsData = data.data;
      this.NewsService.updateNews(this.newsData);
    });
  }

  fetchBreakingNews(): void {
    this.NewsService.getNews(this.category).subscribe(response => {
      this.newsData = response.data;
      this.NewsService.updateNews(this.newsData);

      if (this.newsData && this.newsData.length > 0) {
        const ri=Math.floor(Math.random()*this.newsData.length);
        this.randomNews=this.newsData[ri].title;
      } else {
        this.randomNews = 'Aucune actualité disponible';
      }

    }, () => {
      this.randomNews = 'Erreur lors du chargement des actualités';
    });
  }
}
