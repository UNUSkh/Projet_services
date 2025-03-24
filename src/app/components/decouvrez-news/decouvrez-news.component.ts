import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { NewsItem } from '../news-card/news-card.component';

@Component({
  selector: 'app-decouvrez-news',
  templateUrl: './decouvrez-news.component.html',
  styleUrls: ['./decouvrez-news.component.css']
})
export class DecouvrezNewsComponent implements OnInit {
  featuredNews: NewsItem[] = [];
  isLoading: boolean = true;
  currentIndex: number = 0;
  errorMessage: string = '';

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.loadFeaturedNews();
  }

  // Get the current 3 news items to display in the carousel
 

  loadFeaturedNews(): void {
    // this.featuredNews = [
    //   {
    //     "author": "Laura Molloy",
    //     "title": "Scientists Discover New Species Deep in the OceanThe species, unlike any known before.",
    //     "description": "Music that “was still in the process of being developed by” the rapper was leaked online in January. The post Eminem’s ex-employee charged over alleged theft of unreleased music in FBI case appeared first on NME.",
    //     "url": "https://www.nme.com/news/music/eminems-ex-employee-charged-over-alleged-theft-of-unreleased-music-3847736?utm_source=rss&utm_medium=rss&utm_campaign=eminems-ex-employee-charged-over-alleged-theft-of-unreleased-music",
    //     "source": "nme",
    //     "image": "https://ichef.bbci.co.uk/ace/standard/1024/cpsprodpb/47cb/live/59097170-05a1-11f0-88b7-5556e7b55c5e.jpg.webp",
    //     "category": "general",
    //     "language": "en",
    //     "country": "us",
    //     "published_at": "2025-03-20T09:30:54+00:00"
    //   },
    //   {
    //     "author": "Bianca Gallo",
    //     "title": "Global Stock Markets See Surge Amid Economic Recovery.",
    //     "description": "Mara Venier lascia Roma dopo 25 anni per trasferirsi a Milano accanto al marito Nicola Carraro. Scopri il motivo della scelta. La &#8220;zia d&#8217;Italia&#8221;, Mara Venier ha sorpreso i suoi fan con un annuncio inaspettato: lascia la sua amata Roma per trasferirsi a Milano. Una scelta non facile, ma per amore è disposta a fare [&#8230;]La news di gossip Mara Venier lascia la casa per il marito Nicola: il gesto d’amore sorprende i fan è stata pubblicata su Gossip Blog.",
    //     "url": "https://www.gossipblog.it/post/mara-venier-lascia-la-casa-per-il-marito-nicola-il-gesto-damore-sorprende-i-fan",
    //     "source": "gossipblog",
    //     "image": "https://ichef.bbci.co.uk/news/480/cpsprodpb/337d/live/5d14a400-05a2-11f0-93be-cfe0eee45431.jpg.webp",
    //     "category": "general",
    //     "language": "it",
    //     "country": "it",
    //     "published_at": "2025-03-20T09:30:45+00:00"
    //   },
    //   {
    //     "author": "Attia Naveed",
    //     "title": "Climate Change: New Report Urges Immediate Global Action and urges.",
    //     "description": "[EDE] Online bestellingen ontvang je in kartonnen dozen en zakken die je daarna weggooit. Het alternatief is er nu in de gemeente Ede. Wethouder Arnold Versteeg (Circulaire Economie) heeft deze week officieel de inleverpunten voor herbruikbare verzendverpakkingen in Ede geopend.",
    //     "url": "https://www.edestad.nl/lokaal/duurzaamheid/1148171/inleverpunten-voor-herbruikbare-verzendverpakkingen-geopend-i",
    //     "source": "edestad",
    //     "image": "https://images.pubble.cloud/worker/jpg/default/840/3332192/96897487/content/2025/3/d135f851-b587-4389-a523-ecd32e65fa1a",
    //     "category": "general",
    //     "language": "nl",
    //     "country": "nl",
    //     "published_at": "2025-03-20T09:30:42+00:00"
    //   },
    //   {
    //     "author": "Bianca Gallo",
    //     "title": "World Leaders Gather to Address Rising Geopolitical Tensions.",
    //     "description": "Striscia la Notizia accusa il Grande Fratello: il televoto potrebbe essere pilotato dai familiari dei concorrenti. Striscia la Notizia continua a smascherare programmi e meccanismi nascosti della televisione, e stavolta sotto la lente del tg satirico ci è finito il Grande Fratello. Stavolta le accuse mosse dal programma di Antonio Ricci sono molto gravi: il [&#8230;]La news di gossip Gravi accuse contro il Grande Fratello: “Televoto pilotato” secondo Striscia è stata pubblicata su Gossip Blog.",
    //     "url": "https://www.gossipblog.it/post/gravi-accuse-contro-il-grande-fratello-televoto-pilotato-secondo-striscia",
    //     "source": "gossipblog",
    //     "image": "https://e3.365dm.com/24/10/1600x900/skynews-jd-vance-vp-debate_6703635.jpg?20241002021729",
    //     "category": "general",
    //     "language": "it",
    //     "country": "it",
    //     "published_at": "2025-03-20T09:30:39+00:00"
    //   },
      // Add more news items as needed
      this.isLoading = true;
    
      
      this.newsService.getNews('general', 'fr', 'fr', 4).subscribe(
        (response) => {
          if (response && response.data) {
            this.featuredNews = response.data;
          } else {
            this.errorMessage = 'Aucune actualité à afficher';
          }
          this.isLoading = false;
        },
        (error) => {
          console.error('Erreur lors du chargement des actualités:', error);
          this.errorMessage = 'Erreur lors du chargement des actualités';
          this.isLoading = false;
        }
      );
  }
}
