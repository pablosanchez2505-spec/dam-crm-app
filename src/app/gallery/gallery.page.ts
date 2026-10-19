import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon,
  IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonSpinner,
  IonToast, IonRefresher, IonRefresherContent
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logOutOutline } from 'ionicons/icons';
import { StorageImage, SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-gallery',
  templateUrl: 'gallery.page.html',
  styleUrls: ['gallery.page.scss'],
  standalone: true,
  imports: [
    CommonModule, RouterLink, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
    IonButton, IonIcon, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle,
    IonSpinner, IonToast, IonRefresher, IonRefresherContent
  ],
})
export class GalleryPage implements OnInit {
  private supabase = inject(SupabaseService);
  private router = inject(Router);

  images: StorageImage[] = [];
  loading = true;
  toastMessage = '';
  isToastOpen = false;

  constructor() {
    addIcons({ logOutOutline });
  }

  async ngOnInit() {
    await this.loadImages();
  }

  async loadImages() {
    this.loading = true;
    try {
      this.images = await this.supabase.getImages();
    } catch (e: any) {
      this.toastMessage = 'Error cargando imágenes: ' + e.message;
      this.isToastOpen = true;
    } finally {
      this.loading = false;
    }
  }

  async refresh(event: CustomEvent) {
    await this.loadImages();
    (event.target as any).complete();
  }

  async logout() {
    await this.supabase.logout();
    await this.router.navigateByUrl('/login', { replaceUrl: true });
  }

  setToastOpen(open: boolean) {
    this.isToastOpen = open;
  }
}
