import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  private locationSubject = new BehaviorSubject<string>('Localisation en cours...');
  location$: Observable<string> = this.locationSubject.asObservable();

  private isFetchingLocation = false;

  constructor(private http: HttpClient) {
    this.getLocation();
  }

  getLocation() {
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
                this.locationSubject.next(locationName);
              } else {
                this.locationSubject.next('Lieu inconnu');
              }
              this.isFetchingLocation = false;
            }, error => {
              this.locationSubject.next('Erreur lors de la récupération du lieu');
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
      this.locationSubject.next('Géolocalisation non supportée par le navigateur');
    }
  }

  private handleGeolocationError(error: GeolocationPositionError) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        this.locationSubject.next('Accès à la localisation refusé');
        break;
      case error.POSITION_UNAVAILABLE:
        this.locationSubject.next('Localisation indisponible');
        break;
      case error.TIMEOUT:
        this.locationSubject.next('Temps d’attente dépassé');
        break;
      default:
        this.locationSubject.next('Erreur inconnue');
    }
  }
}
