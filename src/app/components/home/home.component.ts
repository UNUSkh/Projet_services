import { Component, inject, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { AuthService } from '../../services/auth.service';
import { GeolocationService } from '../../services/geolocation.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
    newsData: any[] = [];  // Déclare la variable qui contiendra les données
    today: Date = new Date();
    location: string = 'Chargement de la localisation...';
    randomNews: string = 'Chargement des actualités...';
    category: string = 'general';
  constructor(
    private NewsService: NewsService,
    private authService: AuthService,
    private geolocationService: GeolocationService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.fetchBreakingNews();
    this.NewsService.getNews(this.category).subscribe(data => {
      this.newsData = data;
    });
    this.geolocationService.location$.subscribe(loc => {
      this.location = loc;
    });
    this.route.queryParams.subscribe(params => {
      this.category = params['category'] || 'general';
      this.fetchBreakingNews();
    });
  }

  logout() {
    this.authService.logout();
  }
  fetchBreakingNews(): void {
    this.NewsService.getNews(this.category).subscribe(response => {
      const news = response.data;
      if (news && news.length > 0) {
        const ri=Math.floor(Math.random()*news.length);
        this.randomNews=news[ri].title;
      } else {
        this.randomNews = 'Aucune actualité disponible';
      }
    }, error => {
      this.randomNews = 'Erreur lors du chargement des actualités';
    });
  }
}
