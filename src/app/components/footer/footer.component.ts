// footer.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();
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
}
