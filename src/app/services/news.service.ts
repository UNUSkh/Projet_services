import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = 'https://api.mediastack.com/v1/news';
  private accessKey = 'a83209eceaf13619e11a5c8541a4332b';

  constructor(private http: HttpClient) { }

  getNews(categories: string = '', countries: string = '', language: string = 'fr', limit: number = 100): Observable<any> {
    let params = new HttpParams()
      .set('access_key', this.accessKey)
      .set('countries', countries)
      .set('languages', language)
      .set('limit', limit.toString());

    if (categories) {
      params = params.set('categories', categories);
    }

    console.log(`API Call: ${this.apiUrl}?${params.toString()}`);
    return this.http.get<any>(this.apiUrl, { params });
  }
}





// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { tap } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class NewsService {
//   private apiUrl = 'https://api.mediastack.com/v1/news';
//   private accessKey = '4ac5bcc43070c88005bd26432e4ac8db';

//   constructor(private http: HttpClient) { }

//   getNews(): Observable<any> {
//     console.log(this.http.get<any>(`${this.apiUrl}?access_key=${this.accessKey}&countries=fr`));
//     return this.http.get<any>(`${this.apiUrl}?access_key=${this.accessKey}&countries=fr`);
//   }
// }

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { map, tap } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class NewsService {
//   private localDataUrl = 'assets/Data.json'; // ✅ Chemin correct

//   constructor(private http: HttpClient) { }

//   getNews(): Observable<any> {
//     return this.http.get<any>(this.localDataUrl).pipe(
//       map(response => response.data), // ✅ Extraire uniquement les données des actualités
//       tap(news => console.log('Données chargées :', news))
//     );
//   }
// }

