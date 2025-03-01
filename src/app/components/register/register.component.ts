import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; 
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null; 

  constructor(private fb: FormBuilder, private authService: AuthService,private router: Router) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pseudo: ['', Validators.required],
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

  onSubmit() {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value;

      
      this.authService.register(email, password)
        .then(() => {
          console.log('Inscription reussie');
          this.router.navigate(['/login']);
        })
        .catch(error => {
          this.handleError(error);
        });
    } else {
      console.log('Formulaire invalide');
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
