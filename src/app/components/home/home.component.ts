import { Component, inject, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-login',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
    newsData: any[] = [];  // Déclare la variable qui contiendra les données

  constructor( private NewsService: NewsService) { }

  ngOnInit(): void {
    // Utilisation du service pour récupérer les données
    this.NewsService.getNews().subscribe(data => {
      this.newsData = data;  // Assigner les données récupérées à la variable
    });
  }
}
