import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  image: string;
  publishedAt?: string;
  published_at?: string;
  source?: string;
  category?: string;
}

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  newsData: NewsArticle[] = [];
  featuredNews: NewsArticle[] = [];
  latestNews: NewsArticle[] = [];
  categoryNews: { [key: string]: NewsArticle[] } = {};
  isLoading: boolean = true;
  errorMessage: string = '';
  filteredNews: NewsArticle[] = [];
  currentDate: Date = new Date();
  activeCategory: string = 'all';

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.loadNews();
  }

  loadNews() {
    this.isLoading = true;
    this.newsService.getNews().subscribe(
      (response: any) => {
        if (response && response.data) {
          // Supprimer les doublons basés sur l'URL de l'article
          const uniqueNews = new Map();
          response.data.forEach((article: any) => {
            const url = article.url;
            if (!uniqueNews.has(url)) {
              uniqueNews.set(url, article);
            }
          });
          this.newsData = Array.from(uniqueNews.values()).map((article: any) => {
            const imageUrl = article.image || article.image_url || 'assets/default.jpg';
            let formattedDate = '';
            if (article.published_at) {
              const date = new Date(article.published_at);
              formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
            } else {
              formattedDate = new Date().toLocaleDateString('fr-FR');
            }
            const category = article.category || this.getCategoryFromKeywords(article.title);

            return {
              title: article.title || 'Sans titre',
              description: article.description || 'Aucune description disponible',
              url: article.url || '#',
              image: imageUrl,
              publishedAt: formattedDate,
              source: article.source || '',
              category: category
            };
          });
          this.organizeNews();
          this.filteredNews = this.newsData;
        } else {
          this.errorMessage = "Aucune donnée trouvée dans l'API.";
          console.error("⚠️ " + this.errorMessage);
        }
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = "Erreur lors du chargement des news";
        console.error("❌ " + this.errorMessage, error);
        this.isLoading = false;
      }
    );
  }

  filterNewsByCategory(category: string) {
    this.activeCategory = category; // Met à jour la catégorie active
    if (category === 'all') {
      this.filteredNews = this.newsData; // Affiche toutes les actualités si "all"
    } else {
      this.filteredNews = this.newsData.filter(article => article.category === category); // Filtre par catégorie
    }
    console.log(this.filteredNews);
  }

  organizeNews() {
    if (this.newsData.length === 0) return;

    // Extract featured news (top articles)
    this.featuredNews = this.newsData.slice(0, 4);

    // Extract latest news
    this.latestNews = this.newsData.slice(4, 10);

    // Organize news by category
    const categories = ['Business', 'Sport', 'Santé', 'Science', 'Technologies', 'Divertissement', 'Général'];
    categories.forEach(category => {
      this.categoryNews[category] = this.newsData.filter(article =>
        article.category === category
      ).slice(0, 4);
    });
  }

  getCategoryFromKeywords(title: string): string {
    // Simple keyword-based categorization
    title = title.toLowerCase();

    if (title.includes('économie') || title.includes('finances') || title.includes('entreprise') ||
        title.includes('marché') || title.includes('bourse')) {
      return 'Business';
    }

    if (title.includes('football') || title.includes('basket') || title.includes('tennis') ||
        title.includes('jeux olympiques') || title.includes('champion')) {
      return 'Sport';
    }

    if (title.includes('santé') || title.includes('médecine') || title.includes('hôpital') ||
        title.includes('virus') || title.includes('maladie')) {
      return 'Santé';
    }

    if (title.includes('science') || title.includes('recherche') || title.includes('découverte') ||
        title.includes('études') || title.includes('innovation')) {
      return 'Science';
    }

    if (title.includes('tech') || title.includes('intelligence artificielle') || title.includes('numérique') ||
        title.includes('informatique') || title.includes('internet')) {
      return 'Technologies';
    }

    if (title.includes('cinéma') || title.includes('musique') || title.includes('film') ||
        title.includes('série') || title.includes('culture')) {
      return 'Divertissement';
    }

    // Default category
    return 'Général';
  }

  getNewsByCategory(category: string): NewsArticle[] {
    return this.categoryNews[category] || [];
  }

  goToArticle(url: string) {
    window.open(url, '_blank');
  }
}

// import { Component, OnInit } from '@angular/core';
// import { NewsService } from '../../services/news.service';

// @Component({
//   selector: 'app-news-list',
//   templateUrl: './news-list.component.html',
//   styleUrls: ['./news-list.component.css']
// })
// export class NewsListComponent implements OnInit {
//   newsData: any[] = [];
//   currentDate: Date = new Date();

//   constructor(private newsService: NewsService) {}

//   ngOnInit() {
//     this.newsService.getNews().subscribe(
//       (data) => {
//         if (data && data.data) {
//           this.newsData = data.data;
//         }
//       },
//       (error) => {
//         console.error('Erreur lors du chargement des news', error);
//       }
//     );
//   }

// }




// // import { Component, OnInit } from '@angular/core';
// // import { NewsService } from '../../services/news.service';

// // @Component({
// //   selector: 'app-news-list',
// //   templateUrl: './news-list.component.html',
// //   styleUrls: ['./news-list.component.css']
// // })
// // export class NewsListComponent implements OnInit {
// //   news: any[] = [];

// //   constructor(private newsService: NewsService) { }

// //   ngOnInit(): void {
// //     this.newsService.getNews().subscribe((articles: any) => {
// //       if (articles && articles.length > 0) {
// //         this.news = articles.data;
// //       } else {
// //         console.log("⚠️ Aucune donnée trouvée dans data.json");
// //       }
// //     }, (error) => {
// //       console.error("❌ Erreur lors du chargement des données :", error);
// //     });
// //   }
// // }

// import { Component, OnInit } from '@angular/core';
// import { NewsService } from '../../services/news.service';

// @Component({
//   selector: 'app-news-list',
//   templateUrl: './news-list.component.html',
//   styleUrls: ['./news-list.component.css']
// })
// export class NewsListComponent implements OnInit {
//   news: any[] = [];

//   constructor(private newsService: NewsService) {}

//   ngOnInit(): void {
//     this.newsService.getNews().subscribe((response: any) => {
//       if (response && response.data) {
//         this.news = response.data;
//       } else {
//         console.error("⚠️ Aucune donnée trouvée dans l'API.");
//       }
//     }, (error) => {
//       console.error("❌ Erreur de récupération des données :", error);
//     });
//   }
// }
