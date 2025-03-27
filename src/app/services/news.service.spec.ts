import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = 'https://api.mediastack.com/v1/news';
  private accessKey = '6dbb5aa15ea719eb010f216df00d81c5';

  constructor(private http: HttpClient) { }

  getNews(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?access_key=${this.accessKey}&keywords=tennis&countries=fr`);
  }
}
