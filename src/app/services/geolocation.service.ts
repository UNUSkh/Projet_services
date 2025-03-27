import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  // Changez le type pour permettre null
  private locationSubject = new BehaviorSubject<{ location: string; coords: { lat: number; lon: number; } } | null>(null);
  location$: Observable<{ location: string; coords: { lat: number; lon: number; } } | null> = this.locationSubject.asObservable();

  private isFetchingLocation = false;

  constructor(private http: HttpClient) {
    this.getLocation();
  }

  getLocation(): void {
    if (this.isFetchingLocation) return;
    this.isFetchingLocation = true;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          this.http.get<any>(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
            .subscribe(data => {
              if (data && data.address) {
                const locationName = `${data.address.city || data.address.town || data.address.village}, ${data.address.country}`;
                this.locationSubject.next({ location: locationName, coords: { lat, lon } });
              } else {
                this.locationSubject.next({ location: 'Lieu inconnu', coords: { lat, lon } });
              }
              this.isFetchingLocation = false;
            }, error => {
              console.error('Erreur de récupération du lieu:', error);
              this.locationSubject.next({ location: 'Erreur lors de la récupération du lieu', coords: { lat, lon } });
              this.isFetchingLocation = false;
            });
        },
        (error) => {
          this.handleGeolocationError(error);
          this.isFetchingLocation = false;
        },
        { timeout: 10000 }
      );
    } else {
      this.locationSubject.next(null);
      console.log('Géolocalisation non supportée par le navigateur');
    }
  }

  private handleGeolocationError(error: GeolocationPositionError) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.log('Accès à la localisation refusé');
        this.locationSubject.next({ location: 'Accès à la localisation refusé', coords: { lat: 0, lon: 0 } });
        break;
      case error.POSITION_UNAVAILABLE:
        console.log('Localisation indisponible');
        this.locationSubject.next({ location: 'Localisation indisponible', coords: { lat: 0, lon: 0 } });
        break;
      case error.TIMEOUT:
        console.log('Temps d’attente dépassé');
        this.locationSubject.next({ location: 'Temps d’attente dépassé', coords: { lat: 0, lon: 0 } });
        break;
      default:
        console.log('Erreur inconnue');
        this.locationSubject.next({ location: 'Erreur inconnue', coords: { lat: 0, lon: 0 } });
        break;
    }
  }
}
