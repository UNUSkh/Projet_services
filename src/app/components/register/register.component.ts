import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  loginForm: FormGroup;
  
    constructor(private fb: FormBuilder) {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        pseudo: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        rememberMe: [false]
      });
    }
  
    onSubmit() {
      if (this.loginForm.valid) {
        console.log('Inscription réussie', this.loginForm.value);
      } else {
        console.log('Veuillez remplir tous les champs correctement');
      }
    }
}
