import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private auth: Auth, private router: Router) {}

  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
      this.auth.onAuthStateChanged(user => {
        if (user) {
          this.router.navigate(['/home'], { replaceUrl: true });
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  }
}
