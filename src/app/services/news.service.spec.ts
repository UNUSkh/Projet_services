import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = 'https://api.mediastack.com/v1/news';
  private accessKey = 'e48e5938dc6b6414b79ef5e2b888c0ff';

  constructor(private http: HttpClient) { }

  getNews(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?access_key=${this.accessKey}&keywords=tennis&countries=fr`);
  }
}
