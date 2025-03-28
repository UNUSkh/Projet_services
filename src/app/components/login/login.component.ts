import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  private userSubject = new BehaviorSubject<any>(null);
  currentUser = this.userSubject.asObservable();

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.errorMessage = null;

      try {
        await this.authService.login(email, password);
        this.router.navigate(['/home'], { replaceUrl: true });
      } catch (error: any) {
        this.handleError(error);
        console.log("Erreur :", error);
      }
    } else {
      this.errorMessage = 'Veuillez remplir tous les champs correctement.';
    }
  }

  handleError(error: any) {
    switch (error.code) {
      case 'auth/invalid-email':
        this.errorMessage = "L'email est invalide.";
        break;
      case 'auth/user-not-found':
        this.errorMessage = "Aucun utilisateur trouvé avec cet email.";
        break;
      case 'auth/wrong-password':
        this.errorMessage = "Mot de passe incorrect.";
        break;
      case 'auth/too-many-requests':
        this.errorMessage = "Trop de tentatives. Réessayez plus tard.";
        break;
      case 'auth/email-not-verified':
        this.errorMessage = "Tu dois vérifier ton mail.";
        break;
      default:
        this.errorMessage = "Une erreur est survenue. Vérifiez vos informations.";
        break;
    }
    console.log("", this.errorMessage);
  }


  async loginWithGoogle() {
    try {
      await this.authService.loginWithGoogle();
      console.log("Connexion avec Google réussie !");

      this.router.navigate(['/']);
    } catch (error) {
      console.error("Erreur d'authentification Google :", error);
    }
  }
}
