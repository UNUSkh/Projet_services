import { Component, inject, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { AuthService } from '../../services/auth.service';
import { GeolocationService } from '../../services/geolocation.service';

@Component({
  selector: 'app-login',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
    newsData: any[] = [];  // Déclare la variable qui contiendra les données
    today: Date = new Date();
    location: string = 'Chargement de la localisation...';

  constructor( 
    private NewsService: NewsService,
    private authService: AuthService,
    private geolocationService: GeolocationService
  
  ){}

  ngOnInit(): void {
    
    // Utilisation du service pour récupérer les données
    this.NewsService.getNews().subscribe(data => {
      this.newsData = data;  // Assigner les données récupérées à la variable
    });
    this.geolocationService.location$.subscribe(loc => {
      this.location = loc;
    });
  }
  
  logout() {
    this.authService.logout();
  }
}
