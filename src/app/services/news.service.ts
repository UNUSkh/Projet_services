import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = 'https://api.mediastack.com/v1/news';
  private accessKey = '6849d44fbdafddcbf8b3fb0b7cdba930';

  constructor(private http: HttpClient) { }

  getNews(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?access_key=${this.accessKey}&keywords=tennis&countries=fr`)
      .pipe(
        tap(response => console.log('API Response:', response)) 
      );
  }
  
  
}
