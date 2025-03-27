import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'newsapp';
  isLoggedIn: boolean = false;

  constructor(private router: Router, private auth: Auth) {
    this.auth.onAuthStateChanged(user => {
      this.isLoggedIn = !!user;
    });
  }
}
