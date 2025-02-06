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
    this.newsService.getNews().subscribe((response: any) => {
      console.log(response); // ✅ Check if data is fetched in browser console
      if (response && response.data) {
        this.news = response.data;
      }else{
        console.log("oaknfkjasnclkja")
      }
    }, (error) => {
      console.error("Error fetching news:", error); // ✅ Log errors
    });
  }
}
