/*import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  news: any[] = [];

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.newsService.getNews().subscribe((response: any) => {
      console.log(response); 
      if (response && response.data) {
        this.news = response.data;
      }else{
        console.log("oaknfkjasnclkja")
      }
    }, (error) => {
      console.error("Error fetching news:", error);
    });
  }
}
*/

import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  news: any[] = [];

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.newsService.getNews().subscribe((articles: any) => {
      if (articles && articles.length > 0) {
        this.news = articles;
      } else {
        console.log("⚠️ Aucune donnée trouvée dans data.json");
      }
    }, (error) => {
      console.error("❌ Erreur lors du chargement des données :", error);
    });
  }
}
