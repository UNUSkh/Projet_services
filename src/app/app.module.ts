import { NgModule, LOCALE_ID  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { NewsListComponent } from './components/news-list/news-list.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';
import { registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';
import localeFr from '@angular/common/locales/fr';
import { NewsService } from './services/news.service';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NewsCardComponent } from './components/news-card/news-card.component';
import { FeaturedNewsComponent } from './components/featured-news/featured-news.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchComponent } from './components/search/search.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DecouvrezNewsComponent } from './components/decouvrez-news/decouvrez-news.component';
import { DecouvCardsComponent } from './components/decouv-cards/decouv-cards.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { RecentNewsComponent } from './components/recent-news/recent-news.component';
import { RecentCardsComponent } from './components/recent-cards/recent-cards.component';


registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    FeaturedNewsComponent,
    NewsListComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    ForgotPasswordComponent,
    NewsListComponent,
    HeaderComponent,
    NavbarComponent,
    NewsCardComponent,
    FooterComponent,
    SearchComponent,
    ProfileComponent,
    DecouvrezNewsComponent,
    DecouvCardsComponent,
    CarouselComponent,
    RecentNewsComponent,
    RecentCardsComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp({"projectId":"newsapp-47394","appId":"1:817937810570:web:14a27c4723cc6e4f4b5973","storageBucket":"newsapp-47394.firebasestorage.app","apiKey":"AIzaSyAG09VdAuUlGNpVVdbzQCQxRoN5faLgwAk","authDomain":"newsapp-47394.firebaseapp.com","messagingSenderId":"817937810570","measurementId":"G-DLJX5B02YX"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [AuthService,
    { provide: LOCALE_ID, useValue: 'fr-FR' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
