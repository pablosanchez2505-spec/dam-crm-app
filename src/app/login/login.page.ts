import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent, IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonItem, IonInput, IonButton, IonToast, IonSpinner
} from '@ionic/angular/standalone';
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, IonContent, IonCard, IonCardContent,
    IonCardHeader, IonCardTitle, IonItem, IonInput, IonButton, IonToast, IonSpinner
  ],
})
export class LoginPage {
  private supabase = inject(SupabaseService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  loading = false;
  toastMessage = '';
  isToastOpen = false;

  async onSubmit() {
    if (this.loginForm.invalid) return;
    this.loading = true;
    try {
      const { email, password } = this.loginForm.value;
      await this.supabase.login(email, password);
      await this.router.navigateByUrl('/home', { replaceUrl: true });
    } catch (e: any) {
      this.toastMessage = 'Error de acceso: ' + (e.message ?? 'credenciales incorrectas');
      this.isToastOpen = true;
    } finally {
      this.loading = false;
    }
  }

  setToastOpen(open: boolean) {
    this.isToastOpen = open;
  }
}
