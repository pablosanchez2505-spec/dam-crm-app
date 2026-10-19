import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';

// Protege las rutas: si no hay sesión, redirige a /login
export const authGuard: CanActivateFn = async () => {
  const supabase = inject(SupabaseService);
  const router = inject(Router);

  await supabase.ready;

  if (supabase.currentUser()) {
    return true;
  }
  return router.createUrlTree(['/login']);
};
