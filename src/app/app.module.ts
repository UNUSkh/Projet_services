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
import localeFr from '@angular/common/locales/fr';


registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    NewsListComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp({"projectId":"newsapp-47394","appId":"1:817937810570:web:14a27c4723cc6e4f4b5973","storageBucket":"newsapp-47394.firebasestorage.app","apiKey":"AIzaSyAG09VdAuUlGNpVVdbzQCQxRoN5faLgwAk","authDomain":"newsapp-47394.firebaseapp.com","messagingSenderId":"817937810570","measurementId":"G-DLJX5B02YX"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [AuthService,
    { provide: LOCALE_ID, useValue: 'fr-FR' }], 
  bootstrap: [AppComponent]
})
export class AppModule { }
