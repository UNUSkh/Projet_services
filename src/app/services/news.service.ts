import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = 'https://api.mediastack.com/v1/news';
  private accessKey = '19f29216447b8303c58c75ebd6b69fc0';
  private newsData: any[] = [];

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

  updateNews(news: any[]): void {
    this.newsData = news;
  }

searchNews(query: string): Observable<any>  {
  console.log('Searching for: in searchNews', query);
  return this.http.get<any>(`${this.apiUrl}?access_key=${this.accessKey}&query=${query}&limit=100`)
}


  getStoredNews(): any[] {
    console.log('Data saved:',this.newsData);
    return this.newsData;
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
//   private localDataUrl = 'assets/Data.json'; // Le chemin correct du fichier JSON

//   constructor(private http: HttpClient) { }

//   // Méthode getNews avec des arguments par défaut
//   getNews(category: string = 'general', language: string = '', country: string = '', limit: number = 4): Observable<any> {
//     return this.http.get<any>(this.localDataUrl).pipe(
//       map(response => {
//         let filteredNews = response.data;

//         // Filtrage des actualités selon les critères
//         if (category) {
//           filteredNews = filteredNews.filter((news: any) => news.category === category);
//         }
//         if (language) {
//           filteredNews = filteredNews.filter((news: any) => news.language === language);
//         }
//         if (country) {
//           filteredNews = filteredNews.filter((news: any) => news.country === country);
//         }

//         // Limiter le nombre d'articles
//         return filteredNews.slice(0, limit);
//       }),
//       tap(news => console.log('Données chargées :', news)) // Debugging
//     );
//   }
// }


