import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  resetForm: FormGroup;
  message: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  async onSubmit() {
    if (this.resetForm.valid) {
      const { email } = this.resetForm.value;
      this.message = '';
      this.errorMessage = '';

      try {
        await this.authService.resetPassword(email);
        this.message = 'Un email de réinitialisation a été envoyé.';
      } catch (error) {
        this.errorMessage = 'Erreur lors de la réinitialisation du mot de passe.';
      }
    } else {
      this.errorMessage = 'Veuillez entrer une adresse email valide.';
    }
  }
}
