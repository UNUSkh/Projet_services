import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  currentYear: number = new Date().getFullYear();
  userName: string = '';

  socialLinks = [
    { name: 'facebook', icon: 'fab fa-facebook-f', url: '#' },
    { name: 'twitter', icon: 'fab fa-twitter', url: '#' },
    { name: 'instagram', icon: 'fab fa-instagram', url: '#' },
    { name: 'youtube', icon: 'fab fa-youtube', url: '#' }
  ];

  categories = [
    { name: 'Tendance', routerLink: '/tendance' },
    { name: 'Sport', routerLink: '/sport' },
    { name: 'Science', routerLink: '/science' },
    { name: 'Business', routerLink: '/business' },
    { name: 'Technologie', routerLink: '/technologie' },
    { name: 'Santé', routerLink: '/sante' }
  ];

  constructor(private authService: AuthService, private router: Router, private auth: Auth) {}

  ngOnInit(): void {
    this.auth.onAuthStateChanged(user => {
      if (user) {
        this.userName = user.displayName ? user.displayName : user.email ? user.email : 'Utilisateur';
      }
    });
  }

  logout(): void {
    this.authService.logout().then(() => {
      this.router.navigate(['/login'], { replaceUrl: true });
    }).catch(error => {
      console.error('Erreur lors de la déconnexion', error);
    });
  }
}
