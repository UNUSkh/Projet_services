import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = 'https://api.mediastack.com/v1/news';
  private accessKey = '68f7d1f6246c146b4316f092cfe4050d';

  constructor(private http: HttpClient) { }

  getNews(categories: string = '', countries: string = '', language: string = 'fr', limit: number = 100): Observable<any> {
    // Initialisation des paramètres HTTP
    let params = new HttpParams()
      .set('access_key', this.accessKey)
      .set('countries', countries)
      .set('languages', language)
      .set('limit', limit.toString());

    // Si une catégorie est fournie, on l'ajoute aux paramètres
    if (categories) {
      params = params.set('categories', categories);
    }

    // Appel à l'API avec les paramètres dynamiques
    console.log(`API Call: ${this.apiUrl}?${params.toString()}`); // Pour voir l'URL de l'API construite
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

