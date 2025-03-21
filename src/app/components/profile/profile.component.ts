import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Auth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  user: any = null;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private auth: Auth,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    const user = this.auth.currentUser;
    if (user) {
      this.loadUserProfile(user.uid);
    } else {
      this.router.navigate(['/login']);
    }
  }

  // Charger les informations du profil utilisateur
  async loadUserProfile(uid: string) {
    try {
      this.user = await this.authService.getUserProfile(uid);
      this.profileForm.patchValue({
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email
      });
    } catch (error) {
      console.error('Erreur lors du chargement du profil:', error);
      this.errorMessage = 'Impossible de charger le profil';
    }
  }

  // Mettre à jour le profil utilisateur
  async onSubmit() {
    if (this.profileForm.valid) {
      const updatedData = this.profileForm.value;
      const user = this.auth.currentUser;

      if (user) {
        try {
          await this.authService.updateUserProfile(user.uid, updatedData);
          this.successMessage = 'Profil mis à jour avec succès!';
        } catch (error) {
          console.error('Erreur lors de la mise à jour du profil:', error);
          this.errorMessage = 'Erreur lors de la mise à jour du profil';
        }
      }
    } else {
      this.errorMessage = 'Veuillez remplir tous les champs correctement';
    }
  }
}
