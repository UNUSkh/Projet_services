import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = 'https://api.mediastack.com/v1/news';
  private accessKey = 'eb98c0d4a086cd3635dadfe445e5d127';

  constructor(private http: HttpClient) { }

  getNews(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?access_key=${this.accessKey}&keywords=tennis&countries=fr`)
      .pipe(
        tap(response => console.log('API Response:', response)) 
      );
  }
}

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

