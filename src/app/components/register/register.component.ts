import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private auth: Auth,private fb: FormBuilder, private authService: AuthService,private router: Router) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, this.passwordMatchValidator]],
      rememberMe: [false]
    });
  }

  passwordMatchValidator(control: any) {
    const password = control?.parent?.get('password')?.value;
    if (password !== control.value) {
      return { mismatch: true };
    }
    return null;
  }

  async onSubmit() {
    if (this.registerForm.valid && this.registerForm.value.password === this.registerForm.value.confirmPassword) {
      const { email, password } = this.registerForm.value;
      this.errorMessage = null;
      this.successMessage = null;

      try {
        await this.authService.register(email, password , this.registerForm.value.firstName, this.registerForm.value.lastName);
        this.successMessage = "Inscription réussie ! Un email de vérification a été envoyé.";
      } catch (error: any) {
        this.errorMessage = "Erreur d'inscription : " + error.message;
      }
    } else {
      this.errorMessage = "Veuillez remplir tous les champs correctement.";
    }
  }

  handleError(error: any) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        this.errorMessage = "Cet email est déjà utilisé.";
        break;
      case 'auth/invalid-email':
        this.errorMessage = "Email invalide.";
        break;
      case 'auth/weak-password':
        this.errorMessage = "Le mot de passe est trop faible. Il doit contenir au moins 6 caractères.";
        break;
      default:
        this.errorMessage = "Une erreur est survenue. Veuillez réessayer.";
        break;
    }
    console.error(this.errorMessage);
  }
}
