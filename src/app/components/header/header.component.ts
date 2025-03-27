import { Component, OnInit } from '@angular/core';
import { GeolocationService } from '../../services/geolocation.service';
import { WeatherService } from '../../services/weather-service.service';

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

  constructor(private geoService: GeolocationService, private weatherService: WeatherService) {}

  ngOnInit() {
    this.geoService.location$.subscribe(loc => {
      if (loc) {
        this.location = loc.location;
        const { lat, lon } = loc.coords;
        this.fetchWeather(lat, lon);
      }
    });
  }

  fetchWeather(lat: number, lon: number) {
    this.weatherService.getWeather(lat, lon).subscribe(
      (data) => {
        this.temperature = `${data.main.temp}°`;
      },
      () => {
        this.temperature = `12°`;
      }
    );
  }
}
