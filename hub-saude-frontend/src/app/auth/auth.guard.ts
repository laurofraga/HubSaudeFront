import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.usuarioAtual$.pipe(
    take(1),
    map(usuario => {
      if (usuario) {
        return true; 
      }
      router.navigate(['/login']); 
      return false;
    })
  );
};
