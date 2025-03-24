import { Component, OnInit } from '@angular/core';
import { GeolocationService } from '../../services/geolocation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  logo = 'FlashActu';
  tagline = 'Votre actu en un éclair';
  currentDate = new Date();
  location = 'Paris';
  temperature = '12°';
  socialLinks = [
    { name: 'Facebook', icon: 'fa fa-facebook', url: '#' },
    { name: 'Twitter', icon: 'fa fa-twitter', url: '#' },
    { name: 'Instagram', icon: 'fa fa-instagram', url: '#' },
    { name: 'YouTube', icon: 'fa fa-youtube', url: '#' }
  ];

  constructor(private geoService: GeolocationService) {}

  ngOnInit() {
    this.geoService.location$.subscribe(loc => {
      this.location = loc;
    });
  }
  
}
