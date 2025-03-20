import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { NewsItem } from '../news-card/news-card.component';

@Component({
  selector: 'app-featured-news',
  templateUrl: './featured-news.component.html',
  styleUrls: ['./featured-news.component.css']
})
export class FeaturedNewsComponent implements OnInit {
  featuredNews: NewsItem[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.loadFeaturedNews();
  }

  loadFeaturedNews() {
    this.isLoading = false;
    this.featuredNews=[
      {
        "author": "Laura Molloy",
        "title": "Eminem’s ex-employee charged over alleged theft of unreleased music in FBI case",
        "description": "Music that “was still in the process of being developed by” the rapper was leaked online in JanuaryThe post Eminem&#8217;s ex-employee charged over alleged theft of unreleased music in FBI case appeared first on NME.",
        "url": "https://www.nme.com/news/music/eminems-ex-employee-charged-over-alleged-theft-of-unreleased-music-3847736?utm_source=rss&utm_medium=rss&utm_campaign=eminems-ex-employee-charged-over-alleged-theft-of-unreleased-music",
        "source": "nme",
        "image": "https://www.nme.com/wp-content/uploads/2025/03/Eminem.-CREDIT_-Kevin-Kane_Getty-Images-for-The-Rock-and-Roll-Hall-of-Fame-1392x884.jpg",
        "category": "general",
        "language": "en",
        "country": "us",
        "published_at": "2025-03-20T09:30:54+00:00"
      },
      {
        "author": "Teresa Knoll",
        "title": "Nachhaltiger Riese: Das größte Windrad der Welt steht in Baden-Württemberg",
        "description": "Das größte Windrad der Welt steht in Baden-Württemberg. Doch dieser Rekord ist bald Geschichte: Ein neuer Gigant entsteht in einem anderen Teil Deutschlands.",
        "url": "https://www.fehmarn24.de/welt/nachhaltiger-riese-das-groesste-windrad-der-welt-steht-in-baden-wuerttemberg-zr-93637052.html",
        "source": "fehmarn24",
        "image": "https://www.fehmarn24.de/assets/images/37/493/37493438-morgenstimmung-in-brandenburg-windenergiepark-2O01.jpg",
        "category": "general",
        "language": "de",
        "country": "de",
        "published_at": "2025-03-20T09:30:50+00:00"
      },
      {
        "author": "Teresa Knoll",
        "title": "Nachhaltiger Riese: Das größte Windrad der Welt steht in Baden-Württemberg",
        "description": "Das größte Windrad der Welt steht in Baden-Württemberg. Doch dieser Rekord ist bald Geschichte: Ein neuer Gigant entsteht in einem anderen Teil Deutschlands.",
        "url": "https://www.kreiszeitung.de/deutschland/nachhaltiger-riese-das-groesste-windrad-der-welt-steht-in-baden-wuerttemberg-zr-93637052.html",
        "source": "kreiszeitung",
        "image": "https://www.kreiszeitung.de/assets/images/37/493/37493438-morgenstimmung-in-brandenburg-windenergiepark-2O01.jpg",
        "category": "general",
        "language": "de",
        "country": "de",
        "published_at": "2025-03-20T09:30:50+00:00"
      },
      {
        "author": "Attia Naveed",
        "title": "Automobilist onder invloed rijdt door na botsing met brommer in Voorthuizen",
        "description": "[VOORTHUIZEN] Een 25-jarige automobilist uit Ede is woensdagmiddag doorgereden na een botsing met een brommer op de kruising van de Rembrandtstraat met de Rubensstraat in Voorthuizen.",
        "url": "https://www.barneveldsekrant.nl/112/ongeval/1148198/automobilist-onder-invloed-rijdt-door-na-botsing-met-brommer-",
        "source": "barneveldsekrant",
        "image": "https://images.pubble.cloud/worker/jpg/default/840/3332236/96897487/content/2025/3/fd621e7a-8e72-4006-b392-e908da358c27",
        "category": "general",
        "language": "nl",
        "country": "nl",
        "published_at": "2025-03-20T09:30:48+00:00"
      },
      {
        "author": "Attia Naveed",
        "title": "ROUNDUP: SGL Carbon erwartet Umsatz- und Ergebnisrückgang - Kursrutsch",
        "description": "WIESBADEN (dpa-AFX) - SGL Carbon geht vorsichtig in das neue Geschäftsjahr. Eine zurückhaltende Nachfrage dürfte die Entwicklung belasten, teilte das Unternehmen am Donnerstag in Wiesbaden mit. Dies gelte besonders für das Geschäft mit der Halbleiterindustrie. Hauptgrund seien niedriger Wachstumsraten bei Elektrofahrzeugen als ursprünglich prognostiziert - und weiterhin hohe Lagerbestände bei den Kunden. [mehr]",
        "url": "https://www.aktiencheck.de/news/Artikel-ROUNDUP_SGL_Carbon_erwartet_Umsatz_und_Ergebnisrueckgang_Kursrutsch-18328714",
        "source": "aktiencheck",
        "image": "https://www.fehmarn24.de/assets/images/37/493/37493438-morgenstimmung-in-brandenburg-windenergiepark-2O01.jpg",
        "category": "general",
        "language": "de",
        "country": "de",
        "published_at": "2025-03-20T09:30:47+00:00"
      },
      {
        "author": "Attia Naveed",
        "title": "AKTIE IM FOKUS: Lanxess zollen Quartalsausblick und früherer Rally Tribut",
        "description": "FRANKFURT (dpa-AFX) - Der Aktienkurs von Lanxess hat am Donnerstag unter einer verhaltenen Prognose für das laufende erste Quartal gelitten. Die Aktien zollten zudem einer Rally Tribut, die schon Anfang März zu Ende gegangen war. Mit einem Abschlag von mehr als 7 Prozent auf 28,61 Euro war die Aktie des Chemiekonzerns der zweitgrößte Verlierer im MDax hinter den Papieren der RTL Group . [mehr]",
        "url": "https://www.aktiencheck.de/news/Artikel-AKTIE_FOKUS_Lanxess_zollen_Quartalsausblick_und_frueherer_Rally_Tribut-18328708",
        "source": "aktiencheck",
        "image": "https://www.fehmarn24.de/assets/images/37/493/37493438-morgenstimmung-in-brandenburg-windenergiepark-2O01.jpg",
        "category": "general",
        "language": "de",
        "country": "de",
        "published_at": "2025-03-20T09:30:47+00:00"
      },
      {
        "author": "Attia Naveed",
        "title": "AKTIE IM FOKUS: Schwache Nachfrage setzt Kurs von SGL Carbon schwer zu",
        "description": "FRANKFURT (dpa-AFX) - Die jüngste zaghafte Erholung der Aktien von SGL Carbon hat am Donnerstag abrupt geendet. Vorsichtige Aussagen des Graphit- und Karbonspezialisten zum Geschäftsverlauf lasteten schwer auf dem Aktienkurs, der als größter Verlierer im SDax der Nebenwerte um mehr als 13 Prozent einbrach auf knapp vier Euro. [mehr]",
        "url": "https://www.aktiencheck.de/news/Artikel-AKTIE_FOKUS_Schwache_Nachfrage_setzt_Kurs_von_SGL_Carbon_schwer-18328710",
        "source": "aktiencheck",
        "image": "https://www.fehmarn24.de/assets/images/37/493/37493438-morgenstimmung-in-brandenburg-windenergiepark-2O01.jpg",
        "category": "general",
        "language": "de",
        "country": "de",
        "published_at": "2025-03-20T09:30:47+00:00"
      },
      {
        "author": "Bianca Gallo",
        "title": "Mara Venier lascia la casa per il marito Nicola: il gesto d’amore sorprende i fan",
        "description": "Mara Venier lascia Roma dopo 25 anni per trasferirsi a Milano accanto al marito Nicola Carraro. Scopri il motivo della scelta. La &#8220;zia d&#8217;Italia&#8221;, Mara Venier ha sorpreso i suoi fan con un annuncio inaspettato: lascia la sua amata Roma per trasferirsi a Milano. Una scelta non facile, ma per amore è disposta a fare [&#8230;]La news di gossip Mara Venier lascia la casa per il marito Nicola: il gesto d’amore sorprende i fan è stata pubblicata su Gossip Blog.",
        "url": "https://www.gossipblog.it/post/mara-venier-lascia-la-casa-per-il-marito-nicola-il-gesto-damore-sorprende-i-fan",
        "source": "gossipblog",
        "image": "https://www.fehmarn24.de/assets/images/37/493/37493438-morgenstimmung-in-brandenburg-windenergiepark-2O01.jpg",
        "category": "general",
        "language": "it",
        "country": "it",
        "published_at": "2025-03-20T09:30:45+00:00"
      },
      {
        "author": "Attia Naveed",
        "title": "Inleverpunten voor herbruikbare verzendverpakkingen geopend in de gemeente Ede",
        "description": "[EDE] Online bestellingen ontvang je in kartonnen dozen en zakken die je daarna weggooit. Het alternatief is er nu in de gemeente Ede. Wethouder Arnold Versteeg (Circulaire Economie) heeft deze week officieel de inleverpunten voor herbruikbare verzendverpakkingen in Ede geopend.",
        "url": "https://www.edestad.nl/lokaal/duurzaamheid/1148171/inleverpunten-voor-herbruikbare-verzendverpakkingen-geopend-i",
        "source": "edestad",
        "image": "https://images.pubble.cloud/worker/jpg/default/840/3332192/96897487/content/2025/3/d135f851-b587-4389-a523-ecd32e65fa1a",
        "category": "general",
        "language": "nl",
        "country": "nl",
        "published_at": "2025-03-20T09:30:42+00:00"
      },
      {
        "author": "Bianca Gallo",
        "title": "Gravi accuse contro il Grande Fratello: “Televoto pilotato” secondo Striscia",
        "description": "Striscia la Notizia accusa il Grande Fratello: il televoto potrebbe essere pilotato dai familiari dei concorrenti. Striscia la Notizia continua a smascherare programmi e meccanismi nascosti della televisione, e stavolta sotto la lente del tg satirico ci è finito il Grande Fratello. Stavolta le accuse mosse dal programma di Antonio Ricci sono molto gravi: il [&#8230;]La news di gossip Gravi accuse contro il Grande Fratello: “Televoto pilotato” secondo Striscia è stata pubblicata su Gossip Blog.",
        "url": "https://www.gossipblog.it/post/gravi-accuse-contro-il-grande-fratello-televoto-pilotato-secondo-striscia",
        "source": "gossipblog",
        "image": "https://www.fehmarn24.de/assets/images/37/493/37493438-morgenstimmung-in-brandenburg-windenergiepark-2O01.jpg",
        "category": "general",
        "language": "it",
        "country": "it",
        "published_at": "2025-03-20T09:30:39+00:00"
      },
      {
        "author": "Attia Naveed",
        "title": "Israel intercepts Yemen-launched missile amid rising regional tensions",
        "description": "Israel intercepted a missile launched from Yemen on Thursday, as Houthi rebels claimed to have targeted Ben Gurion Airport. The Israeli military confirmed the interception before the missile crossed into its airspace. The Iran-backed Houthis, who have been attacking Red Sea ships and Israel since the Gaza war began, resumed strikes after U.S. airstrikes in [&#8230;]",
        "url": "https://dailytimes.com.pk/1277707/israel-intercepts-yemen-launched-missile-amid-rising-regional-tensions/",
        "source": "dailytimes",
        "image": "https://www.fehmarn24.de/assets/images/37/493/37493438-morgenstimmung-in-brandenburg-windenergiepark-2O01.jpg",
        "category": "general",
        "language": "en",
        "country": "pk",
        "published_at": "2025-03-20T09:30:35+00:00"
      }]
      
    // this.newsService.getNews('general', 'fr', 'fr', 4).subscribe(
    //   (response) => {
    //     if (response && response.data) {
    //       this.featuredNews = response.data;
    //     } else {
    //       this.errorMessage = 'Aucune actualité à afficher';
    //     }
    //     this.isLoading = false;
    //   },
    //   (error) => {
    //     console.error('Erreur lors du chargement des actualités:', error);
    //     this.errorMessage = 'Erreur lors du chargement des actualités';
    //     this.isLoading = false;
    //   }
    // );
  }
}
